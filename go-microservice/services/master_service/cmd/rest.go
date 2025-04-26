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

	return nil
}
