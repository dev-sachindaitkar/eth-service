import { Request, Response } from "express";
import { sendTransaction } from "../../services/eth.service";
import { logger } from "../../config/logger";

export const sendTxController = async (req: Request, res: Response) => {
  const { privateKey, to, amount } = req.validated?.params;
  logger.info({ to, amount }, "Transaction request received");
  const tx = await sendTransaction(
    privateKey as string,
    to as string,
    amount as string,
  );
  res.json(tx);
};
