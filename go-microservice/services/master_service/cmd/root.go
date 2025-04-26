package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var RootCmd = &cobra.Command{
	Use:   "master-service",
	Short: "Master service for tutors plan",
}

func init() {
	RootCmd.AddCommand(&cobra.Command{
		Use:   "serve-rest",
		Short: "Serve the REST API",
		RunE:  serveRest,
	})
}

func Execute() {
	if err := RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
