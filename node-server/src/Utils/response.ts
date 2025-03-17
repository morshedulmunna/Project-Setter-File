import {
  TCustomErrorResponse,
  TGenericSuccessMessages,
} from "@/Utils/types/response.type";
import { Request, Response } from "express";
import {
  AppLogger,
  getLogServiceName,
  getRequestPayload,
  globalLoggerAssigner,
  globalLoggerChecker,
  globalLoggerInvoker,
} from "./log/logger";
import Configs from "@/Configs";
import { pickFunction } from "./helpers/pickFunction";

const successResponse = <T, M>(
  res: Response,
  data: TGenericSuccessMessages<T, M>
) => {
  const property = pickFunction(data, [
    "message",
    "data",
    "statusCode",
    "meta",
    "req",
  ]);
  const req = property.req as Request;
  delete property.req;

  const responsePayload = {
    success: true,
    ...property,
  };
  AppLogger(
    `successResponse - ${property.message ?? ""}`,
    {},
    {
      logType: "info",
      request: req,
    }
  );
  res.status(data.statusCode).json(responsePayload);
};

const errorResponse = (res: Response, data: TCustomErrorResponse) => {
  const property = pickFunction(data, [
    "errorMessages",
    "message",
    "statusCode",
    "stack",
    "req",
  ]);

  const req = property.req as Request;
  delete property.req;

  const responsePayload = {
    success: false,
    ...property,
    // message: data.message,
    // errorMessages: data.errorMessages,
    // stack: data.stack,
    // statusCode: data.statusCode
  };
  AppLogger(
    `errorResponse - ${property.message ?? ""}`,
    { error: responsePayload },
    {
      errorType: "application",
      logType: "error",
      request: req,
    }
  );
  res.status(data.statusCode).json(responsePayload);
};

export const SendResponse = {
  success: successResponse,
  error: errorResponse,
};

/**
 * @description - This function is used to log the response to the service
 * @param req - request object
 * @param responsePayload - response object
 * @param success - boolean
 * @param type - type of the log level e.g. error, warn, info, debug
 */
export const localLogger = (
  req?: Request,
  responsePayload?: any,
  success?: boolean,
  type?: "info" | "error" | "warn" | "debug"
) => {
  if (!Configs.loki_host) return;

  if (!req || !responsePayload || !success || !type) return;

  const { originalUrl, method } = getRequestPayload(req as Request);
  const { statusCode } = responsePayload;
  const serviceName = getLogServiceName(req as Request);

  /**
   * @description - This function is used to log the error response to the service
   * Step 1: Check if the service already has a logger
   * Step 2: If not, create a new logger
   * Step 3: Log the error response
   */
  // console.log('inside local logger', { method, statusCode, originalUrl, serviceName })
  if (method && statusCode && originalUrl) {
    // Check if the service already has a logger, if not, create a new logger
    const serviceAlreadyExists = globalLoggerChecker(serviceName);

    // create a new logger
    if (!serviceAlreadyExists) {
      globalLoggerAssigner(serviceName);
    }

    if (success) {
      delete responsePayload.data;
    }

    const customLabel =
      type === "debug"
        ? `${type.toUpperCase()} ${responsePayload.message}`
        : `${method} ${originalUrl} ${statusCode}`;

    // Log the error response
    globalLoggerInvoker(
      serviceName,
      customLabel,
      { response: responsePayload, header: req?.rawHeaders },
      type || "info"
    );
  }
};
