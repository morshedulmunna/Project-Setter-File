import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routers from "./routers/index";
import { AppError, globalErrorHandler } from "./utils/error";
import errorLogStream from "./utils/log_file_setup";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// static upload folder
app.use("/assets", express.static("assets"));

// - Router
routers(app);

// Middleware to catch undefined routes
app.all("/*", (req, _res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
});

// Configure Morgan to log errors
app.use(
  morgan("combined", {
    stream: errorLogStream,
    skip: function (_req, res) {
      return res.statusCode < 400;
    },
  })
);

// Global error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
