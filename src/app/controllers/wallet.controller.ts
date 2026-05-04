import { Request, Response } from "express";

import { createWallet } from "../../services/eth.service";
import { logger } from "../../config/logger";

export const createWalletController = async (req: Request, res: Response) => {
  logger.info("Wallet creation request");
  const wallet = createWallet();
  logger.info({ wallet }, "Wallet created successfully");
  res.json({ success: true, wallet });
};
