import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname",
});

const logger = pino(
  {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
  },
  stream
);

export default logger;
