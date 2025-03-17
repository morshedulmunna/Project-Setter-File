import { Router } from "express";
import path from "path";
import rootRouter from ".";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const configRoutes = Router();
const mainDocs = YAML.load(path.join(process.cwd(), "docs/main.docs.yml"));

configRoutes
  // .get(
  //     '/metrics',
  //     metricsController.getMetrics
  // )
  .use("/docs", swaggerUI.serve, swaggerUI.setup(mainDocs))
  .use("/api/v1", rootRouter);

export default configRoutes;
