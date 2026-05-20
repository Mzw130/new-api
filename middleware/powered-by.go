package middleware

import (
	"github.com/gin-gonic/gin"
)

// PoweredBy sets a lightweight identification header for observability.
func PoweredBy() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("X-Powered-By", "new-api")
		c.Next()
	}
}
