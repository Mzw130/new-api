package common

import (
	"os"
	"strings"
)

// LogSplitDeploymentHints prints operational hints when embedded UI is disabled.
func LogSplitDeploymentHints() {
	if strings.TrimSpace(os.Getenv("SERVE_EMBEDDED_FRONTEND")) != "false" {
		return
	}
	SysLog("runtime: SERVE_EMBEDDED_FRONTEND=false (API process without embedded SPA)")
	if strings.TrimSpace(os.Getenv("FRONTEND_BASE_URL")) == "" {
		SysLog("hint: set FRONTEND_BASE_URL so unmatched paths can redirect browsers to the static SPA host")
	}
	if strings.TrimSpace(os.Getenv("CORS_ALLOWED_ORIGINS")) == "" {
		SysLog("hint: set CORS_ALLOWED_ORIGINS for cross-origin browser calls (comma-separated https:// origins)")
	}
	ss := strings.ToLower(strings.TrimSpace(os.Getenv("SESSION_COOKIE_SAMESITE")))
	if ss == "none" && strings.TrimSpace(os.Getenv("SESSION_COOKIE_SECURE")) != "true" {
		SysError("SESSION_COOKIE_SAMESITE=none typically requires SESSION_COOKIE_SECURE=true behind HTTPS")
	}
}
