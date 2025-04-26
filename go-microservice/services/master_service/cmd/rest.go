package cmd

import (
	"master_service/config"
	"master_service/logger"

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

	logger.Info("Starting REST server", "port", cnf.HttpPort)
	logger.Debug("Debug mode enabled", "service", cnf.ServiceName)
	logger.Warn("APM configuration", "server", cnf.Apm.ServerURL, "env", cnf.Apm.Environment)
	logger.Error("Failed to connect to database", "error", "connection timeout")

	return nil
}
