import { NextFunction, Response, Request } from "express";
import { HealthService } from "./health.service";
import AsyncSync from "@/Utils/async-try-catch";
import { SendResponse } from "@/Utils/response";

const CheckerController = AsyncSync(
  async (req: Request, res: Response, next: NextFunction) => {
    SendResponse.success(res, {
      statusCode: 200,
      message: "Service is up and running",
    });
  }
);

export const HealController = {
  CheckerController,
};
