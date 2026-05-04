import dotenv from "dotenv";

dotenv.config();

export const RPC_URL = (process.env.ETH_RPC_URL || "").trim();

if (RPC_URL.length === 0) {
  throw new Error("Missing required environment variable: ETH_RPC_URL");
}

export const PORT: number = (() => {
  const rawPort = process.env.PORT;
  if (!rawPort) return 4001;

  const n = parseInt(rawPort, 10);
  if (Number.isNaN(n) || n <= 0 || n > 65535) {
    throw new Error(`Invalid port number: ${rawPort}`);
  }
  return n;
})();
