import { Router } from "express";
import { getEthEcosystemMarketData } from "../controllers/market.controller";

const router = Router();
router.get("/eth-ecosystem", getEthEcosystemMarketData);

export default router;
