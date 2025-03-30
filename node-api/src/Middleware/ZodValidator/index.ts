import { SendResponse } from "@/Utils/response";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const ZodValidation = (schema: { parse: (arg0: any) => void }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        // res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid data", details: errorMessages });
        SendResponse.error(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          message: "Sending invalid data",
          errorMessages: errorMessages as any,
        });
      } else {
        next(error);
      }
    }
  };
};

export default ZodValidation;
