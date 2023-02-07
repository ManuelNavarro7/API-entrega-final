import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { memoryUsage } from "process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function SwitchPath() {
  let ProcessPath = process.env.MODO;

  switch (ProcessPath) {
    case undefined:
      return path.resolve(__dirname, "develope.env");
    case "develope":
      return path.resolve(__dirname, "develope.env");
    case "prod":
      return path.resolve(__dirname, "prod.env");
    case "fork":
      return path.resolve(__dirname, "develope.env");
    case "cluster":
      return path.resolve(__dirname, "prod.env");
  }
}
