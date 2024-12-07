import fs from "fs";
import path from "path";

const getLogFileName = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // const hours = String(date.getHours()).padStart(2, "0");
  // const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}.log`;
};

const logFilePath = path.join(process.cwd(), "logs", getLogFileName());

// Ensure the logs directory exists
const ensureDirectoryExists = (filePath: string): void => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExists(logFilePath);

const errorLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

export default errorLogStream;
