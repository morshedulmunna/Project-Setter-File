package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func serveRest(cmd *cobra.Command, args []string) error {
	fmt.Println("Serving the REST API...")

	return nil
}
