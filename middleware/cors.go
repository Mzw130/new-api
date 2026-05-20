/*
Copyright (C) 2023-2026 QuantumNous

Split deploy: use CORS_ALLOWED_ORIGINS + optional CORS_ALLOW_LOOPBACK_ANY_PORT.
*/
package middleware

import (
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var logExplicitCORSOnce sync.Once

func parseAllowedOrigins(raw string) []string {
	parts := strings.Split(raw, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			out = append(out, p)
		}
	}
	return out
}

func originLooksLikeSecureLoopback(origin string) bool {
	if origin == "" {
		return false
	}
	u, err := url.Parse(origin)
	if err != nil || (u.Scheme != "http" && u.Scheme != "https") || u.Host == "" {
		return false
	}
	host := strings.ToLower(u.Hostname())
	return host == "localhost" || host == "127.0.0.1" || host == "::1"
}

// AllowHeaders for cross-origin SPA + relays; include "*" so new client headers don't break dev.
func permissiveCORSCredentialsExtra(config *cors.Config) {
	config.AllowCredentials = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"}
	config.AllowHeaders = []string{"*"}
	config.ExposeHeaders = []string{"Content-Length", "Content-Type"}
	config.MaxAge = 86400 * time.Second
}

// CORS returns a Gin middleware.
//
// When CORS_ALLOWED_ORIGINS is non-empty: allow listed origins (+ optional loopback, see env).
// When empty: permissive dev behavior — reflect the request Origin (never "*") so
// Access-Control-Allow-Credentials: true still works (browsers reject "*" with credentials).
func CORS() gin.HandlerFunc {
	raw := strings.TrimSpace(os.Getenv("CORS_ALLOWED_ORIGINS"))
	if raw == "" {
		config := cors.DefaultConfig()
		permissiveCORSCredentialsExtra(&config)
		// Not AllowAllOrigins: that emits ACAO "*" which is invalid with credentials (axios withCredentials).
		config.AllowOriginFunc = func(_ string) bool { return true }
		return cors.New(config)
	}

	allowed := parseAllowedOrigins(raw)
	// Default true so Docker split-dev works when SPA is on :3000, :3003, Rsbuild, etc.; set "false" in production-facing APIs behind a gateway.
	allowLoopbackExtras := strings.TrimSpace(os.Getenv("CORS_ALLOW_LOOPBACK_ANY_PORT")) != "false"

	config := cors.DefaultConfig()
	permissiveCORSCredentialsExtra(&config)
	config.AllowOriginFunc = func(origin string) bool {
		if origin == "" {
			return false
		}
		oNorm := strings.ToLower(strings.TrimSpace(origin))
		for _, allowedOrigin := range allowed {
			if strings.ToLower(strings.TrimSpace(allowedOrigin)) == oNorm {
				return true
			}
		}
		return allowLoopbackExtras && originLooksLikeSecureLoopback(origin)
	}
	logExplicitCORSOnce.Do(func() {
		logMsg := "CORS_ALLOWED_ORIGINS: " + strings.Join(allowed, ", ")
		if allowLoopbackExtras {
			logMsg += " (+ http(s)://localhost|127.0.0.1|[::1]:* ports)"
		}
		common.SysLog(logMsg)
	})
	return cors.New(config)
}
