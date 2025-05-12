// This file can be used for frontend-specific configurations,
// like lists of supported chains if not fetched from backend,
// or default settings.

// Example: Statically defined chains for fallback or if backend is down
// This is largely handled by wagmi/RainbowKit now, but can be a reference.
export const EVM_CHAINS_CONFIG = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: \`https://mainnet.infura.io/v3/\${import.meta.env.VITE_INFURA_ID}\`, // Example
    explorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  {
    id: 'bsc',
    name: 'BNB Smart Chain',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com/',
    explorer: 'https://polygonscan.com',
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  },
  {
    id: 'avalanche',
    name: 'Avalanche C-Chain',
    chainId: 43114,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://snowtrace.io',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  },
];

// You might also store default token creation parameters or UI settings here.
export const DEFAULT_TOKEN_SETTINGS = {
  taxFee: 0,
  liquidityFee: 0,
  // ...
};

// Ensure you have VITE_YOUR_PROJECT_ID in your .env for WalletConnect
// Ensure you have VITE_INFURA_ID or similar if using specific providers like Infura/Alchemy in wagmi config.
// For RainbowKit, the projectId is crucial.
// Create a .env file in your frontend directory (frontend/.env)
// VITE_YOUR_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
// VITE_ALCHEMY_API_KEY="YOUR_ALCHEMY_KEY" (optional)
