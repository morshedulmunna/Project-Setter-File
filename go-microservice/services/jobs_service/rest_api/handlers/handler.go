package handlers

import (
	"master_service/config"
	"master_service/rest_api/utils"
	"net/http"
)

type Handlers struct {
	cnf *config.Config
	// masterSvc master.Service
}

func NewHandler(cnf *config.Config) *Handlers {
	return &Handlers{
		cnf: cnf,
	}
}

func (handlers *Handlers) NotFound(w http.ResponseWriter, r *http.Request) {
	utils.SendError(w, http.StatusNotFound, "Route not found", nil)
}
