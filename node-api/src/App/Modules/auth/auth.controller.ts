import { Request, Response } from "express";
import { UserService } from "./auth.service";
import AsyncSync from "@/Utils/async-try-catch";
import { SendResponse } from "@/Utils/response";
import { StatusCodes } from "http-status-codes";

export const registerUserController = AsyncSync(
  async (req: Request, res: Response) => {
    const results = await UserService.registerUser(req.body);

    // Set HTTP-only cookie
    res.cookie("token", results.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    SendResponse.success(res, {
      statusCode: StatusCodes.CREATED,
      message: "User Register Successfully",
      data: results,
    });
  }
);

export const loginUserController = AsyncSync(
  async (req: Request, res: Response) => {
    const result = await UserService.login(req.body);
  }
);
