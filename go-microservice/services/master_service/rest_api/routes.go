package rest_api

import (
	"fmt"
	"net/http"

	"master_service/rest_api/middlewares"
)

type RouteGroup struct {
	Path       string
	Handler    http.Handler
	Middleware []middlewares.Middleware
}

func (server *Server) initRoutes(mux *http.ServeMux, manager *middlewares.Manager) {
	version := server.cnf.ApiVersion
	basePath := fmt.Sprintf("%s/%s", server.cnf.ServiceBasePath, version)

	// Define route groups for different versions
	routeGroups := map[string][]RouteGroup{
		"v1": {
			{
				Path:    "/",
				Handler: http.HandlerFunc(server.handlers.Root),
			},
			{
				Path:    "/hello",
				Handler: http.HandlerFunc(server.handlers.Hello),
			},
			{
				Path:       "/protected",
				Handler:    http.HandlerFunc(server.handlers.Protected),
				Middleware: []middlewares.Middleware{middlewares.AuthMiddleware},
			},
		},
		"v2": {
			// Add v2 specific routes here
		},
	}

	// Register routes for the configured version
	if routes, exists := routeGroups[version]; exists {
		for _, route := range routes {
			fullPath := fmt.Sprintf("GET %s%s", basePath, route.Path)
			mux.Handle(fullPath, manager.With(route.Handler, route.Middleware...))
		}
	}

	// Add catch-all route for 404s
	mux.Handle("GET /", manager.With(http.HandlerFunc(server.handlers.NotFound)))
}
