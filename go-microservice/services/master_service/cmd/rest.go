package cmd

import (
	"log/slog"
	"master_service/config"
	"master_service/logger"
	"master_service/rest_api"

	"github.com/spf13/cobra"
)

var serveRestCmd = &cobra.Command{
	Use:   "serve-rest",
	Short: "Serve the REST API",
	RunE:  serveRest,
}

func serveRest(cmd *cobra.Command, args []string) error {
	cnf := config.GetConfig()
	logger.SetupLogger(cnf.ServiceName)

	server, err := rest_api.NewServer(cnf, nil)
	if err != nil {
		slog.Error("Failed to create the server:", logger.Extra(map[string]any{
			"error": err.Error(),
		}))
		return err
	}

	server.Start()
	server.Wg.Wait()

	return nil
}
