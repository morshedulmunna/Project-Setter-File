import Configs from "@/Configs";
import CustomError from "@/Utils/errors/customError.class";
import { TCustomErrorResponse } from "@/Utils/types/response.type";
import { processMongooseValidationError } from "@/Utils/validation/mongoose.validation";
import { processZodValidation } from "@/Utils/validation/zod.validation";
import { ErrorRequestHandler } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import multer from "multer";
import { AppLogger } from "@/Utils/log/logger";
import { SendResponse } from "@/Utils/response";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let defaultError: TCustomErrorResponse = {
    statusCode: 500,
    message: "Something went wrong !.",
    errorMessages: [],
    stack: Configs.node_env === "development" && err.stack ? err.stack : undefined,
    req,
  };

  if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
    const handler = processMongooseValidationError(err);
    defaultError.statusCode = handler.statusCode;
    defaultError.message = handler.message;
    defaultError.errorMessages = handler.errorMessages;
  } else if (err instanceof CustomError) {
    defaultError.statusCode = err.statusCode;
    defaultError.message = err.message;
  } else if (err instanceof ZodError) {
    const handler = processZodValidation.errorValidation(err);
    defaultError.statusCode = handler.statusCode;
    defaultError.message = handler.message;
    defaultError.errorMessages = handler.errorMessages;
  } else if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    defaultError.statusCode = 400;
    defaultError.message = err.message;
    defaultError.stack = err.stack;
    defaultError.errorMessages = [
      {
        path: err.name,
        message: err.message,
      },
    ];
  } else if (err instanceof multer.MulterError) {
    defaultError.statusCode = 400;
    defaultError.message = err.message;
    defaultError.stack = err.stack;
    defaultError.errorMessages = [
      {
        path: err.field || "",
        message: err.code,
      },
    ];
  }

  AppLogger(
    "globalErrorHandler",
    {
      error: {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        errorMessages: err.errorMessages,
      },
    },
    { logType: "error", serviceName: "globalErrorHandler" }
  );

  SendResponse.error(res, defaultError);
};

export default globalErrorHandler;
