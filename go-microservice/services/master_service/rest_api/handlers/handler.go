package handlers

import "master_service/config"

type Handlers struct {
	cnf *config.Config
	// masterSvc master.Service
}

func NewHandler(cnf *config.Config) *Handlers {
	return &Handlers{
		cnf: cnf,
	}
}
