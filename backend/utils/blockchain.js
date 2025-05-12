// backend/utils/blockchain.js
import { ethers } from 'ethers';

// This file can contain utility functions for blockchain interactions.
// For example, getting gas price, estimating gas, interacting with contracts, etc.

export function getProvider(rpcUrl) {
  if (!rpcUrl) throw new Error("RPC URL is required to create a provider.");
  return new ethers.JsonRpcProvider(rpcUrl);
}

export function getWallet(privateKey, provider) {
  if (!privateKey) throw new Error("Private key is required to create a wallet.");
  if (!provider) throw new Error("Provider is required to create a wallet.");
  return new ethers.Wallet(privateKey, provider);
}

export async function getGasPrice(provider) {
  try {
    const feeData = await provider.getFeeData();
    return feeData.gasPrice;
  } catch (error) {
    console.error("Error fetching gas price:", error);
    throw error;
  }
}

export async function estimateContractDeploymentGas(bytecode, abi, signer, ...args) {
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const deployTx = await factory.getDeployTransaction(...args);
  try {
    const gasEstimate = await signer.estimateGas(deployTx);
    return gasEstimate;
  } catch (error) {
    console.error("Error estimating gas for deployment:", error);
    // Provide a fallback or more detailed error
    if (error.message.includes("insufficient funds")) {
        throw new Error("Insufficient funds for gas * price + value.");
    }
    throw new Error(\`Gas estimation failed: ${error.message}\`);
  }
}

// Add more utility functions as needed:
// - verifyContractOnExplorer(contractAddress, chainId, constructorArgs)
// - createLiquidityPool(tokenA, tokenB, amountA, amountB, dexRouterAddress, wallet)
// - etc.

// Note: Functions like verifyContractOnExplorer and createLiquidityPool are complex
// and would require specific SDKs or API interactions (e.g., Etherscan API, Uniswap SDK).
