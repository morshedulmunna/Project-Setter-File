import fs from "fs";
import { Request, Response, NextFunction } from "express";

const errorLogStream = fs.createWriteStream("error.log", { flags: "a" });

class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Set default values for statusCode and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Create a unique error ID
  const errorId = new Date().getTime();

  const errorLogDetails = {
    errorId: errorId,
    status: err.status,
    statusCode: err.statusCode,
    url: req.originalUrl,
    message: err.message,
    timestamp: new Date().toISOString(),
  };

  const errorLogString = JSON.stringify(errorLogDetails, null, 2);

  errorLogStream.write(errorLogString + "\n");

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      url: req.originalUrl,
      message: err.message,
      timestamp: new Date().toISOString(),
      errorId: errorId,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      statusCode: 500,
      url: req.originalUrl,
      message: "Something went very wrong!",
      timestamp: new Date().toISOString(),
      errorId: errorId,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
    });
  }

  next();
};

export { globalErrorHandler, AppError };
