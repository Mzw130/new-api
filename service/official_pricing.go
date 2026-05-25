package service

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"sort"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
)

const (
	modelsDevAPIURL              = "https://models.dev/api.json"
	officialPriceSnapshotOptionKey = "OfficialPriceSnapshot"
	officialPriceFetchTimeout    = 15 * time.Second
)

// OfficialPriceEntry is USD per 1M tokens (models.dev convention).
type OfficialPriceEntry struct {
	InputPerM     float64  `json:"input_per_m"`
	OutputPerM    *float64 `json:"output_per_m,omitempty"`
	CacheReadPerM *float64 `json:"cache_read_per_m,omitempty"`
	Provider      string   `json:"provider,omitempty"`
}

type OfficialPriceSnapshot struct {
	UpdatedAt int64                           `json:"updated_at"`
	Source    string                          `json:"source"`
	Prices    map[string]OfficialPriceEntry   `json:"prices"`
}

type OfficialPlatformVariant struct {
	ModelName string  `json:"model_name"`
	InputPerM float64 `json:"input_per_m"`
	OutputPerM *float64 `json:"output_per_m,omitempty"`
}

type OfficialCompareRow struct {
	CanonicalKey     string                    `json:"canonical_key"`
	VendorName       string                    `json:"vendor_name,omitempty"`
	VendorIcon       string                    `json:"vendor_icon,omitempty"`
	Official         *OfficialPriceEntry       `json:"official,omitempty"`
	PlatformInputPerM float64                  `json:"platform_input_per_m"`
	PlatformOutputPerM *float64                `json:"platform_output_per_m,omitempty"`
	DiscountPercent  *float64                  `json:"discount_percent,omitempty"`
	VariantCount     int                       `json:"variant_count"`
	Variants         []OfficialPlatformVariant `json:"variants,omitempty"`
	QuotaType        int                       `json:"quota_type"`
}

type OfficialPriceChange struct {
	CanonicalKey string             `json:"canonical_key"`
	Field        string             `json:"field"`
	OldValue     float64            `json:"old_value"`
	NewValue     float64            `json:"new_value"`
	ChangePct    float64            `json:"change_pct"`
	Official     OfficialPriceEntry `json:"official"`
}

func FetchModelsDevOfficialPrices() (map[string]OfficialPriceEntry, error) {
	client := &http.Client{Timeout: officialPriceFetchTimeout}
	resp, err := client.Get(modelsDevAPIURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("models.dev returned status %d", resp.StatusCode)
	}
	body, err := io.ReadAll(io.LimitReader(resp.Body, 32<<20))
	if err != nil {
		return nil, err
	}
	return parseModelsDevOfficialPrices(body)
}

func parseModelsDevOfficialPrices(body []byte) (map[string]OfficialPriceEntry, error) {
	var upstream map[string]struct {
		Models map[string]struct {
			Cost struct {
				Input     *float64 `json:"input"`
				Output    *float64 `json:"output"`
				CacheRead *float64 `json:"cache_read"`
			} `json:"cost"`
		} `json:"models"`
	}
	if err := json.Unmarshal(body, &upstream); err != nil {
		return nil, err
	}
	selected := make(map[string]officialCandidate)
	providers := make([]string, 0, len(upstream))
	for p := range upstream {
		providers = append(providers, p)
	}
	sort.Strings(providers)
	for _, provider := range providers {
		models := upstream[provider].Models
		names := make([]string, 0, len(models))
		for n := range models {
			names = append(names, n)
		}
		sort.Strings(names)
		for _, modelName := range names {
			cost := models[modelName].Cost
			if cost.Input == nil || !isValidCost(*cost.Input) {
				continue
			}
			candidate := officialCandidate{
				Provider: provider,
				Input:    *cost.Input,
				Output:   cost.Output,
				Cache:    cost.CacheRead,
			}
			cur, ok := selected[modelName]
			if !ok || shouldPreferOfficialCandidate(cur, candidate) {
				selected[modelName] = candidate
			}
		}
	}
	out := make(map[string]OfficialPriceEntry, len(selected))
	for name, c := range selected {
		entry := OfficialPriceEntry{
			InputPerM: c.Input,
			Provider:  c.Provider,
		}
		if c.Output != nil && isValidCost(*c.Output) {
			v := *c.Output
			entry.OutputPerM = &v
		}
		if c.Cache != nil && isValidCost(*c.Cache) {
			v := *c.Cache
			entry.CacheReadPerM = &v
		}
		out[name] = entry
	}
	return out, nil
}

type officialCandidate struct {
	Provider string
	Input    float64
	Output   *float64
	Cache    *float64
}

func isValidCost(v float64) bool {
	return !math.IsNaN(v) && !math.IsInf(v, 0) && v >= 0
}

func shouldPreferOfficialCandidate(cur, next officialCandidate) bool {
	if cur.Input == 0 && next.Input > 0 {
		return true
	}
	if next.Input > 0 && cur.Input > 0 && next.Input < cur.Input {
		return true
	}
	return next.Provider < cur.Provider
}

func lookupOfficialPrice(canonical string, official map[string]OfficialPriceEntry) *OfficialPriceEntry {
	if canonical == "" {
		return nil
	}
	if e, ok := official[canonical]; ok {
		copy := e
		return &copy
	}
	lower := strings.ToLower(canonical)
	if e, ok := official[lower]; ok {
		copy := e
		return &copy
	}
	return nil
}

func platformInputUSDPerM(p model.Pricing, minGroupRatio float64) float64 {
	if p.QuotaType != 0 {
		return 0
	}
	return p.ModelRatio * 2 * minGroupRatio
}

func platformOutputUSDPerM(p model.Pricing, minGroupRatio float64) *float64 {
	if p.QuotaType != 0 {
		return nil
	}
	v := p.ModelRatio * 2 * minGroupRatio * p.CompletionRatio
	return &v
}

func minGroupRatioForPricing(p model.Pricing, groupRatio map[string]float64) float64 {
	min := math.MaxFloat64
	for _, g := range p.EnableGroup {
		r, ok := groupRatio[g]
		if !ok {
			continue
		}
		if r < min {
			min = r
		}
	}
	if min == math.MaxFloat64 {
		return 1
	}
	return min
}

func BuildOfficialCompareRows(pricing []model.Pricing, groupRatio map[string]float64) ([]OfficialCompareRow, error) {
	official, err := FetchModelsDevOfficialPrices()
	if err != nil {
		return nil, err
	}
	var allMeta []model.Model
	_ = model.DB.Find(&allMeta).Error
	resolver := model.BuildCanonicalResolver(allMeta)
	channelNames := make([]string, 0, len(pricing))
	for _, p := range pricing {
		channelNames = append(channelNames, p.ModelName)
	}
	resolver.AttachChannelModels(channelNames)

	type agg struct {
		row       OfficialCompareRow
		variants  map[string]OfficialPlatformVariant
	}
	groups := make(map[string]*agg)

	for _, p := range pricing {
		if p.QuotaType != 0 {
			continue
		}
		canonical := resolver.Resolve(p.ModelName)
		minRatio := minGroupRatioForPricing(p, groupRatio)
		in := platformInputUSDPerM(p, minRatio)
		out := platformOutputUSDPerM(p, minRatio)
		g, ok := groups[canonical]
		if !ok {
			off := lookupOfficialPrice(canonical, official)
			g = &agg{
				row: OfficialCompareRow{
					CanonicalKey: canonical,
					VendorName:   p.Icon,
					Official:     off,
					QuotaType:    p.QuotaType,
					Variants:     []OfficialPlatformVariant{},
				},
				variants: make(map[string]OfficialPlatformVariant),
			}
			if p.Description != "" {
				_ = p.Description
			}
			groups[canonical] = g
		}
		g.variants[p.ModelName] = OfficialPlatformVariant{
			ModelName:  p.ModelName,
			InputPerM:  in,
			OutputPerM: out,
		}
		if g.row.PlatformInputPerM == 0 || in < g.row.PlatformInputPerM {
			g.row.PlatformInputPerM = in
			g.row.PlatformOutputPerM = out
			if p.Icon != "" {
				g.row.VendorIcon = p.Icon
			}
		}
	}

	rows := make([]OfficialCompareRow, 0, len(groups))
	for _, g := range groups {
		g.row.VariantCount = len(g.variants)
		if len(g.variants) > 0 {
			g.row.Variants = make([]OfficialPlatformVariant, 0, len(g.variants))
			for _, v := range g.variants {
				g.row.Variants = append(g.row.Variants, v)
			}
			sort.Slice(g.row.Variants, func(i, j int) bool {
				return g.row.Variants[i].ModelName < g.row.Variants[j].ModelName
			})
		}
		if g.row.Official != nil && g.row.Official.InputPerM > 0 && g.row.PlatformInputPerM > 0 {
			pct := (1 - g.row.PlatformInputPerM/g.row.Official.InputPerM) * 100
			g.row.DiscountPercent = &pct
		}
		rows = append(rows, g.row)
	}
	sort.Slice(rows, func(i, j int) bool {
		return rows[i].CanonicalKey < rows[j].CanonicalKey
	})
	return rows, nil
}

func LoadOfficialPriceSnapshotTime() int64 {
	snap, err := LoadOfficialPriceSnapshot()
	if err != nil || snap == nil {
		return 0
	}
	return snap.UpdatedAt
}

func LoadOfficialPriceSnapshot() (*OfficialPriceSnapshot, error) {
	common.OptionMapRWMutex.RLock()
	raw := common.OptionMap[officialPriceSnapshotOptionKey]
	common.OptionMapRWMutex.RUnlock()
	if strings.TrimSpace(raw) == "" {
		var opt model.Option
		if err := model.DB.Where("`key` = ?", officialPriceSnapshotOptionKey).First(&opt).Error; err != nil {
			return nil, nil
		}
		raw = opt.Value
	}
	if strings.TrimSpace(raw) == "" {
		return nil, nil
	}
	var snap OfficialPriceSnapshot
	if err := json.Unmarshal([]byte(raw), &snap); err != nil {
		return nil, err
	}
	return &snap, nil
}

func SaveOfficialPriceSnapshot(prices map[string]OfficialPriceEntry) error {
	snap := OfficialPriceSnapshot{
		UpdatedAt: common.GetTimestamp(),
		Source:    "models.dev",
		Prices:    prices,
	}
	b, err := json.Marshal(snap)
	if err != nil {
		return err
	}
	return model.UpdateOption(officialPriceSnapshotOptionKey, string(b))
}

func DetectOfficialPriceChanges(refreshSnapshot bool) ([]OfficialPriceChange, *OfficialPriceSnapshot, error) {
	current, err := FetchModelsDevOfficialPrices()
	if err != nil {
		return nil, nil, err
	}
	prev, _ := LoadOfficialPriceSnapshot()
	changes := make([]OfficialPriceChange, 0)
	if prev != nil && len(prev.Prices) > 0 {
		for key, now := range current {
			old, ok := prev.Prices[key]
			if !ok {
				continue
			}
			if !nearlyEqualPrice(old.InputPerM, now.InputPerM) {
				changes = append(changes, buildPriceChange(key, "input", old.InputPerM, now.InputPerM, now))
			}
			if old.OutputPerM != nil && now.OutputPerM != nil && !nearlyEqualPrice(*old.OutputPerM, *now.OutputPerM) {
				changes = append(changes, buildPriceChange(key, "output", *old.OutputPerM, *now.OutputPerM, now))
			}
		}
	}
	sort.Slice(changes, func(i, j int) bool {
		return changes[i].CanonicalKey < changes[j].CanonicalKey
	})
	if refreshSnapshot {
		_ = SaveOfficialPriceSnapshot(current)
	}
	snap := &OfficialPriceSnapshot{
		UpdatedAt: common.GetTimestamp(),
		Source:    "models.dev",
		Prices:    current,
	}
	return changes, snap, nil
}

func buildPriceChange(key, field string, oldV, newV float64, now OfficialPriceEntry) OfficialPriceChange {
	pct := 0.0
	if oldV > 0 {
		pct = ((newV - oldV) / oldV) * 100
	}
	return OfficialPriceChange{
		CanonicalKey: key,
		Field:        field,
		OldValue:     oldV,
		NewValue:     newV,
		ChangePct:    pct,
		Official:     now,
	}
}

func nearlyEqualPrice(a, b float64) bool {
	const eps = 1e-9
	if a > b {
		return a-b < eps
	}
	return b-a < eps
}
