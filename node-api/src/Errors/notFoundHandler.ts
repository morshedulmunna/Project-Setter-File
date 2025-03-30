import { SendResponse } from "@/Utils/response";
import { Request, Response } from "express";

const notFoundHandler = async (req: Request, res: Response) => {
  SendResponse.error(res, {
    statusCode: 404,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "path not found",
      },
    ],
    req,
  });
};

export default notFoundHandler;
