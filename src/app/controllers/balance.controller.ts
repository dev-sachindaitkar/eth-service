import { Request, Response } from "express";
import { getBalance } from "../../services/eth.service";
import { logger } from "../../config/logger";
import { getCache, setCache } from "../../utils/cache";

export const getBalanceController = async (req: Request, res: Response) => {
  const { address } = req.validated.params;
  const cacheKey = `balance:${address}`;
  const data = await getCache(cacheKey);
  if (data) {
    return res.json({ success: true, address, balance: data });
  }
  const balance = await getBalance(address as string);
  logger.info({ address, balance }, "Balance fetched successfully");
  setCache(cacheKey, balance, 30);
  res.json({ success: true, address, balance });
};
