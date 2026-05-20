/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetPerfMetricsSummary serves GET /api/perf-metrics/summary — used by the default UI dashboard.
// Persistence-backed metrics are optional; when disabled or empty, return a valid empty payload
// so split-origin SPAs do not hit 404 + CORS noise.
func GetPerfMetricsSummary(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"models": []any{},
		},
	})
}

// GetPerfMetrics serves GET /api/perf-metrics — per-model time series for the pricing/dashboard UI.
func GetPerfMetrics(c *gin.Context) {
	modelName := c.Query("model")
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"model_name": modelName,
			"groups":     []any{},
		},
	})
}
