package logger

import (
	"fmt"
	"io"
	"log/slog"
	"os"
	"path"
	"time"

	"gopkg.in/natefinch/lumberjack.v2"
)

func replacer(groups []string, a slog.Attr) slog.Attr {
	switch a.Key {
	case slog.TimeKey:
		return slog.Time(string(TimeKey), a.Value.Resolve().Time())

	case slog.MessageKey:
		return slog.String(string(MessageKey), a.Value.String())

	case slog.SourceKey:
		src := a.Value.Any().(*slog.Source)
		if src.Function == "" {
			return slog.Attr{}
		}
		base := path.Base(src.File)
		return slog.String(
			string(CallerKey),
			fmt.Sprintf("%s:%s:%d", base, src.Function, src.Line),
		)

	case slog.LevelKey:
		l := a.Value.Any().(slog.Level)
		return slog.String(string(LevelKey), levels[l])

	default:
		return a
	}
}

func SetupLogger(serviceName string) {
	// Create logs directory if it doesn't exist
	if err := os.MkdirAll("logs", 0755); err != nil {
		panic(fmt.Sprintf("failed to create logs directory: %v", err))
	}

	// Setup file rotation
	fileLogger := &lumberjack.Logger{
		Filename:   fmt.Sprintf("logs/%s.log", serviceName),
		MaxSize:    100, // megabytes
		MaxBackups: 30,  // keep 30 days of logs
		MaxAge:     30,  // days
		Compress:   true,
	}

	// Create multi-writer for both file and stdout
	multiWriter := io.MultiWriter(os.Stdout, fileLogger)

	// Setup JSON handler with Grafana-friendly format
	logger := slog.New(slog.NewJSONHandler(multiWriter, &slog.HandlerOptions{
		AddSource:   true,
		Level:       slog.LevelDebug,
		ReplaceAttr: replacer,
	})).With(
		string(ServiceKey), serviceName,
		"timestamp", time.Now().Format(time.RFC3339),
	)

	slog.SetDefault(logger)
}
