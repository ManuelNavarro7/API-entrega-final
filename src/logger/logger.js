import winston from "winston";

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: "./logger/warning.log",
        level: "warning",
      }),
      new winston.transports.File({
        filename: "./logger/error.log",
        level: "error",
      }),
      new winston.transports.Console({ level: "info" }),
    ],
  });

  return prodLogger;
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "info" })],
  });
  return devLogger;
}

const logger =
  process.env.MODO === "prod" ? buildProdLogger() : buildDevLogger();

export default logger;
