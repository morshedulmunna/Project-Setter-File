package rest_api

import (
	"fmt"
	"net/http"

	"master_service/rest_api/middlewares"
)

type RouteGroup struct {
	Path       string
	Method     string
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
				Method:  "GET",
				Path:    "/",
				Handler: http.HandlerFunc(server.handlers.Root),
			},
			{
				Method:  "GET",
				Path:    "/hello",
				Handler: http.HandlerFunc(server.handlers.Hello),
			},
			// {
			// 	Method:  "POST",
			// 	Path:    "/hello",
			// 	Handler: http.HandlerFunc(server.handlers.CreateHello),
			// },
			{
				Method:  "GET",
				Path:    "/protected",
				Handler: http.HandlerFunc(server.handlers.Protected),
				Middleware: []middlewares.Middleware{
					middlewares.AuthMiddleware,
					// middlewares.Logger,
					// middlewares.Recover,
				},
			},
		},
		"v2": {
			// Add v2 specific routes here
		},
	}

	// Register routes for the configured version
	if routes, exists := routeGroups[version]; exists {
		for _, route := range routes {
			fullPath := fmt.Sprintf("%s %s%s", route.Method, basePath, route.Path)
			mux.Handle(fullPath, manager.With(route.Handler, route.Middleware...))
		}
	}

	// Add catch-all route for 404s
	mux.Handle("GET /", manager.With(http.HandlerFunc(server.handlers.NotFound)))
}
