import express, { Router } from "express";
import { registerUserController, loginUserController } from "./auth.controller";
import ZodValidation from "@/Middleware/ZodValidator";
import { ZLoginSchema, ZRegisterSchema } from "./auth.types";

const authRouter = Router();

authRouter
  .post("/register", ZodValidation(ZRegisterSchema), registerUserController)
  .post("/login", ZodValidation(ZLoginSchema), loginUserController);

export default authRouter;
