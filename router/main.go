package router

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/controller"
	"github.com/QuantumNous/new-api/middleware"

	"github.com/gin-gonic/gin"
)

// SetRouter wires API routes and optionally embedded web UI or external SPA redirect.
//
// SERVE_EMBEDDED_FRONTEND (default true): when "false", does not serve embedded dist.
// FRONTEND_BASE_URL: when set, Gin NoRoute redirects to this origin + path (static SPA on OSS/CDN).
// On master node, FRONTEND_BASE_URL is ignored while SERVE_EMBEDDED_FRONTEND is true (same as before).
func SetRouter(router *gin.Engine, assets ThemeAssets) {
	SetApiRouter(router)
	SetDashboardRouter(router)
	SetRelayRouter(router)
	SetVideoRouter(router)

	serveEmbedded := strings.TrimSpace(os.Getenv("SERVE_EMBEDDED_FRONTEND")) != "false"
	frontendBaseUrl := strings.TrimSpace(os.Getenv("FRONTEND_BASE_URL"))

	if common.IsMasterNode && frontendBaseUrl != "" && serveEmbedded {
		frontendBaseUrl = ""
		common.SysLog("FRONTEND_BASE_URL is ignored on master node while SERVE_EMBEDDED_FRONTEND is true (default embedded UI)")
	}

	if serveEmbedded && frontendBaseUrl == "" {
		SetWebRouter(router, assets)
		return
	}

	if serveEmbedded && frontendBaseUrl != "" {
		frontendBaseUrl = strings.TrimSuffix(frontendBaseUrl, "/")
		router.NoRoute(func(c *gin.Context) {
			c.Set(middleware.RouteTagKey, "web")
			c.Redirect(http.StatusMovedPermanently, fmt.Sprintf("%s%s", frontendBaseUrl, c.Request.RequestURI))
		})
		return
	}

	common.SysLog("SERVE_EMBEDDED_FRONTEND=false: embedded static UI disabled")

	if frontendBaseUrl != "" {
		frontendBaseUrl = strings.TrimSuffix(frontendBaseUrl, "/")
		router.NoRoute(func(c *gin.Context) {
			c.Set(middleware.RouteTagKey, "web")
			c.Redirect(http.StatusMovedPermanently, fmt.Sprintf("%s%s", frontendBaseUrl, c.Request.RequestURI))
		})
		return
	}

	router.NoRoute(func(c *gin.Context) {
		c.Set(middleware.RouteTagKey, "web")
		path := c.Request.URL.Path
		if strings.HasPrefix(path, "/v1") || strings.HasPrefix(path, "/api") || strings.HasPrefix(path, "/assets") {
			controller.RelayNotFound(c)
			return
		}
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "API-only mode: set FRONTEND_BASE_URL to the static SPA origin for browser redirects, or SERVE_EMBEDDED_FRONTEND=true to serve built-in UI.",
		})
	})
}
