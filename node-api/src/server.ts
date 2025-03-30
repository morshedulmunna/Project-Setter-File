import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import configRoutes from "./Routes/config";
import globalErrorHandler from "./Errors/globalErrorHandler";
import notFoundHandler from "./Errors/notFoundHandler";
import connectDB from "./Configs/mongo.config";

const app: Application = express();
// app.enable('trust proxy')
// app.enable('x-powered-by')
// app.enable()
app.set("trust proxy", 1 /* number of proxies between user and server */);
app.use(
  expressRateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // Limit each IP to 300 requests per windowMs
    message: "Too many requests from this IP, please try again after 5 minutes",
  })
);
app.use(express.json({ limit: "50mb" }));

const origins = ["http://localhost:3000"];

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
// Route
app.use("/", configRoutes);
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
