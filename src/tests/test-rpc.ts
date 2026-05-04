import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();
console.log(process.env.ETH_RPC_URL);
const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);

async function main() {
  console.log(process.env.PORT);
  const block = await provider.getBlockNumber();
  console.log("Connected, latest block is ", block);
}

main();
