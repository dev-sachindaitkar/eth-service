import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const getEthEcosystemMarketData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "ethereum, arbitrum, optimism, polygon,base,starknet,zkSync",
          vs_currencies: "usd",
        },
      },
    );
    res.status(200).json({
      data: response.data,
      timestamp: Date.now(),
    });
  } catch (err: any) {}
};
