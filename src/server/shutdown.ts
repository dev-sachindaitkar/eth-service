import { logger } from "../config/logger";
import { server } from "./server";

export const setupGracefulShutdown = () => {
  logger.info("Setting up graceful shutdown handlers");
  const shutdown = (signal: string) => {
    logger.warn(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info("Server closed. Exiting process.");
      process.exit(0);
    });

    setTimeout(() => {
      logger.warn("forced shutdown due to timeout");
    }, 5000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};
