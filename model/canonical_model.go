package model

import "strings"

// CanonicalResolver maps channel-facing model IDs to one official model key.
type CanonicalResolver struct {
	channelToMeta map[string]*Model
	exact         map[string]*Model
	prefixList    []*Model
	suffixList    []*Model
	containsList  []*Model
}

// BuildCanonicalResolver loads metadata matching rules from the models table.
func BuildCanonicalResolver(allMeta []Model) *CanonicalResolver {
	r := &CanonicalResolver{
		channelToMeta: make(map[string]*Model),
		exact:         make(map[string]*Model),
	}
	for i := range allMeta {
		m := &allMeta[i]
		switch m.NameRule {
		case NameRulePrefix:
			r.prefixList = append(r.prefixList, m)
		case NameRuleSuffix:
			r.suffixList = append(r.suffixList, m)
		case NameRuleContains:
			r.containsList = append(r.containsList, m)
		default:
			r.exact[m.ModelName] = m
		}
	}
	for name := range r.exact {
		r.attach(name)
	}
	return r
}

func (r *CanonicalResolver) AttachChannelModels(channelModels []string) {
	for _, name := range channelModels {
		r.attach(name)
	}
}

func (r *CanonicalResolver) attach(channelModel string) {
	if channelModel == "" {
		return
	}
	if _, exists := r.channelToMeta[channelModel]; exists {
		return
	}
	if m, ok := r.exact[channelModel]; ok {
		r.channelToMeta[channelModel] = m
		return
	}
	for _, m := range r.prefixList {
		if strings.HasPrefix(channelModel, m.ModelName) {
			r.channelToMeta[channelModel] = m
			return
		}
	}
	for _, m := range r.suffixList {
		if strings.HasSuffix(channelModel, m.ModelName) {
			r.channelToMeta[channelModel] = m
			return
		}
	}
	for _, m := range r.containsList {
		if strings.Contains(channelModel, m.ModelName) {
			r.channelToMeta[channelModel] = m
			return
		}
	}
}

func (r *CanonicalResolver) Resolve(channelModel string) string {
	if r == nil || channelModel == "" {
		return channelModel
	}
	meta, ok := r.channelToMeta[channelModel]
	if !ok {
		return channelModel
	}
	switch meta.NameRule {
	case NameRuleSuffix:
		if base := strings.TrimSuffix(channelModel, meta.ModelName); base != "" {
			return base
		}
	case NameRulePrefix:
		if base := strings.TrimPrefix(channelModel, meta.ModelName); base != "" {
			return base
		}
	case NameRuleContains:
		if base := strings.Replace(channelModel, meta.ModelName, "", 1); base != "" {
			return strings.Trim(base, "-_./")
		}
	case NameRuleExact:
		return channelModel
	}
	if meta.ModelName != "" && meta.NameRule != NameRuleExact {
		return meta.ModelName
	}
	return channelModel
}
