package handlers

import (
	"net/http"

	"master_service/rest_api/utils"
)

func (handlers *Handlers) Root(w http.ResponseWriter, r *http.Request) {
	utils.SendJson(w, http.StatusOK, map[string]any{
		"success": true,
		"message": "Welcome to Jobs Service API v1",
		"status":  "healthy",
	})
}

func (handlers *Handlers) Hello(w http.ResponseWriter, r *http.Request) {
	utils.SendJson(w, http.StatusOK, map[string]any{
		"success": true,
		"message": "Service is healthy and running 100%",
		"status":  "healthy",
	})
}
