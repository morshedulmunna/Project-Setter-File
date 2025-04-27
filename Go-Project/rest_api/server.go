package rest_api

import (
	"fmt"
	"log/slog"
	"master_service/config"
	"master_service/rest_api/handlers"
	"master_service/rest_api/middlewares"
	"master_service/rest_api/swagger"
	"net/http"
	"sync"

	"go.elastic.co/apm/module/apmhttp"
)

type Server struct {
	handlers *handlers.Handlers
	cnf      *config.Config
	Wg       sync.WaitGroup
}

func NewServer(cnf *config.Config, handlers *handlers.Handlers) (*Server, error) {
	server := &Server{
		cnf:      cnf,
		handlers: handlers,
	}

	return server, nil
}

func (server *Server) Start() {
	manager := middlewares.NewManager()

	manager.Use(
		middlewares.Recover,
		middlewares.Logger,
	)

	mux := http.NewServeMux()

	server.initRoutes(mux, manager)

	handler := middlewares.EnableCors(mux)

	swagger.SetupSwagger(mux, manager)

	server.Wg.Add(1)

	go func() {
		defer server.Wg.Done()

		addr := fmt.Sprintf(":%d", server.cnf.HttpPort)
		slog.Info(fmt.Sprintf("Listening at %s (API %s)", addr, server.cnf.ApiVersion))

		if err := http.ListenAndServe(addr, apmhttp.Wrap(handler)); err != nil {
			slog.Error(err.Error())
		}
	}()
}
