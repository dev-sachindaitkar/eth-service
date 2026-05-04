import express from "express";

import router from "./routes/routes";
import markets from "./routes/markets";

import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { globalRateLimit } from "./middleware/rateLimit";
import helmet from "helmet";
import cors from "cors";

const app = express();
app.use(requestLogger);
app.use(helmet());
app.use(
  cors({
    origin: "*",
  }),
);

app.use(globalRateLimit);
app.use(express.json());
app.use("/api", router);
app.use("/api/market", markets);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});
app.use(errorHandler);

export default app;
