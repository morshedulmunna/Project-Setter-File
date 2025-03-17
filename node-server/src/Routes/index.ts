import authRouter from "@/App/Modules/auth/auth.route";
import { HealController } from "@/App/Modules/health/health.controller";
import { Router } from "express";
const rootRouter = Router();

rootRouter.use("/health", HealController.CheckerController);
rootRouter.use("/auth", authRouter);

export default rootRouter;
