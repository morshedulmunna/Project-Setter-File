package config

import (
	"master_service/config/db"
	"sync"
)

var cnfOnce = sync.Once{}

type Mode string

const DebugMode = Mode("debug")
const ReleaseMode = Mode("release")

// Apm represents Application Performance Monitoring configuration
type Apm struct {
	ServiceName string `mapstructure:"APM_SERVICE_NAME" validate:"required"` // Name of the service in APM
	ServerURL   string `mapstructure:"APM_SERVER_URL"   validate:"required"` // URL of the APM server
	SecretToken string `mapstructure:"APM_SECRET_TOKEN" validate:"required"` // Authentication token for APM
	Environment string `mapstructure:"APM_ENVIRONMENT"  validate:"required"` // Environment name (e.g. prod, dev)
}

type Config struct {
	Version          string `mapstructure:"VERSION"                  validate:"required"`
	Mode             Mode   `mapstructure:"MODE"                     validate:"required"`
	ServiceName      string `mapstructure:"SERVICE_NAME"             validate:"required"`
	HttpPort         int    `mapstructure:"HTTP_PORT"                validate:"required"`
	HealthCheckRoute string `mapstructure:"HEALTH_CHECK_ROUTE"       validate:"required"`
	Apm              *Apm
	Database         db.DBConfig
	JwtSecret        string `mapstructure:"JWT_SECRET"               validate:"required"`
}

var config *Config

func GetConfig() *Config {
	cnfOnce.Do(func() {
		loadConfig()
	})
	return config
}
