import winston from "winston";

const logger: winston.Logger = winston.createLogger({
  level: "info", 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [ new winston.transports.Console() ],
});

export default logger;