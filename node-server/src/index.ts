import http from "http";
import Configs from "./Configs";
import app from "./server";
import { AppLogger } from "./Utils/log/logger";
import ConnectMongoDB from "./Configs/mongo.config";

const { port } = Configs;
const server = http.createServer(app);

const main = async () => {
  try {
    server.listen(port, () => {
      ConnectMongoDB();
      AppLogger(
        `Server is listening on ${port}. Url: http://localhost:${port}`
      );
      AppLogger(`Server documentation: http://localhost:${port}/docs`);
    });
  } catch (e) {
    AppLogger((e as Error).message, e, {
      logType: "error",
      errorType: "system",
    });
  }
};

main();

// For many types of unhandled rejections, it's not always necessary or advisable to close the server.
process.on("unhandledRejection", (err) => {
  AppLogger("unhandledRejection =>", err, {
    logType: "error",
    errorType: "system",
  });
});

//handle unCaught exceptions
process.on("uncaughtException", (err) => {
  AppLogger("unhandledException =>", err, {
    logType: "error",
    errorType: "system",
  });
  setTimeout(() => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
  }, 5000);
});

// sigterm errors
process.on("SIGTERM", () => {
  const logMessage = "SIGTERM signal received for graceful shutdown";
  // systemErrorLogger(logMessage); // Pass a message instead of an error
  AppLogger(logMessage, {}, { logType: "info", errorType: "system" });

  setTimeout(() => {
    if (server) {
      server.close(() => {
        AppLogger(
          "HTTP server closed, exiting process",
          {},
          { logType: "info", errorType: "system" }
        );
        process.exit(0);
      });
    } else {
      AppLogger(
        "No server instance, exiting process",
        {},
        { logType: "info", errorType: "system" }
      );
      process.exit(0);
    }
  }, 5000);
});
