package rest_api

import (
	"net/http"

	"master_service/rest_api/middlewares"
)

func (server *Server) initRoutes(mux *http.ServeMux, manager *middlewares.Manager) {

	mux.Handle(
		"GET /payment/api/v1/hello",
		manager.With(
			http.HandlerFunc(server.handlers.Hello),
		),
	)
}
