import { ethers } from "ethers";

import { PORT, RPC_URL } from "../config/env";
import { retry } from "../utils/retry";
import { timeStamp } from "node:console";

const provider = new ethers.JsonRpcProvider(RPC_URL);

export const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    mnemonic: wallet.mnemonic?.phrase,
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};

const getWallet = (privateKey: string) => {
  return new ethers.Wallet(privateKey, provider);
};

export const getBalance = async (address: string) => {
  return retry(async () => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  });
};

export const sendTransaction = async (
  privateKey: string,
  to: string,
  amount: string,
) => {
  const wallet = getWallet(privateKey);
  retry(async () => {
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });
    return tx;
  });
};

export const checkRpcHealth = async () => {
  return retry(async () => {
    const network = await provider.getNetwork();
    const latestBlock = await provider.getBlockNumber();
    return {
      connected: true,
      network: network.name,
      chainId: Number(network.chainId),
      latestBlock,
      timeStamp: new Date().getTime(),
    };
  });
};
