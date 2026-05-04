import { NextFunction, Request, Response } from "express";
import { logger } from "../../config/logger";
import { checkRpcHealth } from "../../services/eth.service";

export const rpcHealthController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("Checking PRC Health");
    const health = await checkRpcHealth();
    res.json({
      success: true,
      ...health,
    });
  } catch (err: any) {
    logger.error("Error checking RPC Health", err);
    res.status(500).json({
      success: false,
      message: "Error checking RPC Health",
    });
  }
};
