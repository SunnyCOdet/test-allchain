import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora, bsc, avalanche } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
// import { alchemyProvider } from 'wagmi/providers/alchemy'; // Optional: if you have an Alchemy API key

// Configure chains & providers
// const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY; // Optional
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    bsc,
    polygon,
    avalanche,
    // optimism, arbitrum, base, zora // Add more as needed
  ],
  [
    // alchemyProvider({ apiKey: alchemyApiKey }), // Optional
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Meme Token Launchpad',
  projectId: 'YOUR_PROJECT_ID', // REPLACE THIS WITH YOUR WALLETCONNECT PROJECT ID
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains}
        theme={lightTheme({ // or darkTheme
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
