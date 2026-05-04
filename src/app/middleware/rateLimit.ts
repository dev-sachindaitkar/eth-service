import rateLimit from "express-rate-limit";
import { logger } from "../../config/logger";

export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for ip: ${req.ip}`);

    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later",
    });
  },
});
