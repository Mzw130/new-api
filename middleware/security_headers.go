package middleware

import (
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

// SecurityHeaders adds baseline hardening headers (opt-in via ENABLE_SECURITY_HEADERS=true).
func SecurityHeaders() gin.HandlerFunc {
	frame := strings.TrimSpace(os.Getenv("SECURITY_FRAME_OPTIONS"))
	if frame == "" {
		frame = "SAMEORIGIN"
	}
	return func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Header("X-Frame-Options", frame)
		c.Header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
		c.Next()
	}
}
