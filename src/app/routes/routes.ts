import { Router } from "express";
import { createWalletController } from "../controllers/wallet.controller";
import { getBalanceController } from "../controllers/balance.controller";
import { send } from "node:process";
import { sendTxController } from "../controllers/tx.controller";
import { validate } from "../middleware/validate";
import { balanceParamSchema } from "../validators/balance.schema";
import { sendTxSchema } from "../validators/ts.schema";
import { rpcHealthController } from "../controllers/rpc.controller";
import rateLimit from "express-rate-limit";
import { getEthEcosystemMarketData } from "../controllers/market.controller";

const router = Router();

router.get("/wallet/create", createWalletController);
router.get(
  "/balance/:address",
  validate(balanceParamSchema),
  getBalanceController,
);

const txRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later",
    });
  },
});
router.post("/tx/send", validate(sendTxSchema), sendTxController);
router.get("/market/eth-ecosystem", getEthEcosystemMarketData);
router.get("/rpc/health", txRateLimit, rpcHealthController);

export default router;
