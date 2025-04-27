package middlewares

import (
	"context"
	"net/http"
	"strings"

	"master_service/rest_api/utils"
)

// AuthMiddleware is a middleware that validates JWT tokens
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get the Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			utils.SendJson(w, http.StatusUnauthorized, map[string]any{
				"success": false,
				"message": "Missing Authorization header",
				"details": "Please provide an Authorization header with a valid Bearer token",
			})
			return
		}

		// Check if the header is in the format "Bearer <token>"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			utils.SendJson(w, http.StatusUnauthorized, map[string]any{
				"success": false,
				"message": "Invalid Authorization header format",
				"details": "Authorization header must be in the format: 'Bearer <token>'",
			})
			return
		}

		token := parts[1]

		// TODO: Add your JWT validation logic here
		// For now, we'll just check if the token is not empty
		if token == "" {
			utils.SendJson(w, http.StatusUnauthorized, map[string]any{
				"success": false,
				"message": "Invalid token",
				"details": "The provided token is empty or invalid",
			})
			return
		}
		// Add the token to the request context
		type contextKey string
		const TokenKey contextKey = "token"

		ctx := context.WithValue(r.Context(), TokenKey, token)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
