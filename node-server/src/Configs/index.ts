import { config } from "dotenv";
import path from "path";

config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT || 9000,
  mongo_uri: process.env.MONGO_URI,
  node_env: process.env.NODE_ENV,
  loki_host: process.env.Loki_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
};
