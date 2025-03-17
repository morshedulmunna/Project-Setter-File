import Configs from "@/Configs";
import { Request } from "express";
import winston from "winston";
import LokiTransport from "winston-loki";

/**
 * @description - This function is used to create a logger for a service
 * @param type - name of the service
 * @returns void
 */
export const globalLoggerAssigner = (type: string, appName?: string) => {
  winston.loggers.add(type, {
    level: "debug",
    format: winston.format.json(),
    transports: [
      new LokiTransport({
        host: Configs.loki_host ?? "",
        labels: {
          app: appName || "Backend-Server",
        },
      }),
    ],
    defaultMeta: {
      service: `${type}-service`,
    },
  });
};

/**
 * @description - This function is used to get the logger for a service
 * @param type - name of the service
 * @returns logger
 */
export const globalLoggerGetter = (type: string) => {
  return winston.loggers.get(type);
};

/**
 * @description - This function is used to check if a logger for a service exists
 * @param type - name of the service
 * @returns boolean
 */
export const globalLoggerChecker = (type: string) => {
  const logger = winston.loggers.has(type);
  return logger ? true : false;
};

/**
 * @description - This function is used to log a message to a service
 * @param service - name of the service
 * @param level - identifier of the log level e.g. GET /payment 200
 * @param message - message to log
 * @param type - type of the log level e.g. error, warn, info, debug
 * @returns void
 */
export const globalLoggerInvoker = (
  service: string,
  level: string,
  message: object,
  type?: "error" | "warn" | "info" | "debug"
) => {
  const logger = globalLoggerGetter(service);
  logger[type || "info"](level, message);
};

/**
 * @description - This function is used to get the request payload
 * @param req - request object
 * @returns object
 */
export const getRequestPayload = (req: Request) => {
  return {
    method: req.method,
    originalUrl: req.originalUrl,
  };
};

/**
 * @description - This function is used to get the service name from the request payload
 * @param req - request object
 * @returns string
 */
export const getLogServiceName = (req: Request) => {
  const pathFormatted = req.originalUrl.replace("/api/v1/", "").split("/")[1];
  let serviceName = services.includes(pathFormatted) ? pathFormatted : "UNKNOWN-SERVICE";

  serviceName = serviceName?.replace("-", "_")?.toUpperCase();

  return serviceName;
};

const services = [
  "agent",
  "auth",
  "balance",
  "blog",
  "coupon",
  "document",
  "exchangerate",
  "mail",
  "payment",
  "platform-payment-method",
  "refund",
  "support",
  "user",
  "wallet",
  "webhook",
  "withdraw",
  "log",
];

export const systemErrorLogger = async (reason: any) => {
  if (!globalLoggerChecker("SYSTEM_ERROR")) {
    globalLoggerAssigner("SYSTEM_ERROR");
  }
  globalLoggerInvoker("SYSTEM_ERROR", reason.toString(), { stack: reason.stack, timestamp: new Date() }, "error");
};

export const AppLogger = (
  message: string,
  optionalData?: any,
  options?: {
    logType?: "info" | "error" | "warn" | "debug";
    errorType?: "system" | "application";
    serviceName?: string;
    appName?: string;
    request?: Request;
    sessionId?: string;
  }
) => {
  const {
    logType = "debug",
    serviceName = "debug_console",
    request,
    errorType = "system",
    appName = "Backend-Server",
  } = options || {};

  console.log(message, ...(optionalData ? [optionalData] : []));
};
