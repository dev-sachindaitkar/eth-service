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

/**
 * @openapi
 * /wallet/create:
 *   get:
 *     summary: Create a new wallet
 *     responses:
 *       200:
 *         description: Wallet created successfully
 */
router.get("/wallet/create", createWalletController);

/**
 * @openapi
 * /balance/{address}:
 *   get:
 *     summary: Get ETH balance
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Balance returned
 */
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

/**
 * @openapi
 * /tx/send:
 *   post:
 *     summary: Send ETH transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               value:
 *                 type: string
 *               gas:
 *                 type: string
 *               gasPrice:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction sent successfully
 */
router.post("/tx/send", validate(sendTxSchema), sendTxController);
/**
 * @openapi
 * /market/eth-ecosystem:
 *   get:
 *     summary: Get ETH ecosystem market data
 *     responses:
 *       200:
 *         description: Market data returned
 */
router.get("/market/eth-ecosystem", getEthEcosystemMarketData);
/**
 * @openapi
 * /rpc/health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/rpc/health", txRateLimit, rpcHealthController);

export default router;
