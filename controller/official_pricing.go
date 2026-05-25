package controller

import (
	"net/http"

	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/service"
	"github.com/QuantumNous/new-api/setting/ratio_setting"
	"github.com/gin-gonic/gin"
)

// GetOfficialPricingCompare returns platform vs official (models.dev) prices grouped by canonical model key.
func GetOfficialPricingCompare(c *gin.Context) {
	pricing := model.GetPricing()
	groupRatio := ratio_setting.GetGroupRatioCopy()
	rows, err := service.BuildOfficialCompareRows(pricing, groupRatio)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"source":  "models.dev",
			"rows":    rows,
			"updated": service.LoadOfficialPriceSnapshotTime(),
		},
	})
}

// GetOfficialPriceAlerts returns official price changes since last stored snapshot (admin).
func GetOfficialPriceAlerts(c *gin.Context) {
	refresh := c.Query("refresh") == "true" || c.Query("refresh") == "1"
	changes, snap, err := service.DetectOfficialPriceChanges(refresh)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"changes":  changes,
			"snapshot": snap,
		},
	})
}

// AckOfficialPriceAlerts stores the current models.dev prices as the baseline snapshot.
func AckOfficialPriceAlerts(c *gin.Context) {
	current, err := service.FetchModelsDevOfficialPrices()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	if err := service.SaveOfficialPriceSnapshot(current); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "ok",
	})
}
