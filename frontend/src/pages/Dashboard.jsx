import React, { useState, useEffect } from 'react';
import TokenForm from '../components/TokenForm';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

function Dashboard() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, error: switchNetworkError, isLoading: isSwitchingNetwork, pendingChainId, switchNetwork } = useSwitchNetwork();
  
  const [backendChains, setBackendChains] = useState([]);
  const [selectedChainConfig, setSelectedChainConfig] = useState(null);

  useEffect(() => {
    // Fetch available chains from backend for dynamic population (optional)
    fetch('/api/config/chains')
      .then(res => res.json())
      .then(data => {
        setBackendChains(data);
        // If connected, try to find the current chain in backendChains
        if (chain && data.length > 0) {
          const currentBackendChain = data.find(bc => bc.chainId === chain.id);
          setSelectedChainConfig(currentBackendChain);
        } else if (data.length > 0) {
          // Default to the first chain if not connected or current chain not found
          setSelectedChainConfig(data[0]); 
        }
      })
      .catch(console.error);
  }, [chain]); // Re-fetch or re-evaluate if network changes

  const handleNetworkSelect = (chainId) => {
    if (switchNetwork) {
      switchNetwork(Number(chainId));
    }
    const newSelectedChain = backendChains.find(c => c.chainId === Number(chainId));
    setSelectedChainConfig(newSelectedChain);
  };

  if (!isConnected) {
    return (
      <div className="text-center p-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to MemeLaunch!</h1>
        <p className="text-gray-600 mb-6">Please connect your wallet to create and manage your meme tokens.</p>
        {/* WalletConnectButton is in the navbar, but you could add another one here */}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">Launch Your Meme Token</h1>
        <p className="text-gray-600 mb-6">Fill in the details below to deploy your token on the selected network.</p>

        <div className="mb-6">
          <label htmlFor="network-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Network:
          </label>
          <select
            id="network-select"
            name="network-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={selectedChainConfig?.chainId || chain?.id || ''}
            onChange={(e) => handleNetworkSelect(e.target.value)}
            disabled={isSwitchingNetwork || !switchNetwork}
          >
            {backendChains.length === 0 && <option>Loading chains...</option>}
            {backendChains.map((bc) => (
              <option key={bc.id} value={bc.chainId}>
                {bc.name} (ID: {bc.chainId}) {chain?.id === bc.chainId ? " (Active)" : ""}
              </option>
            ))}
          </select>
          {isSwitchingNetwork && <p className="text-sm text-purple-600 mt-1">Switching network to chain ID: {pendingChainId}...</p>}
          {switchNetworkError && <p className="text-sm text-red-600 mt-1">Error switching network: {switchNetworkError.message}</p>}
        </div>
        
        {chain && selectedChainConfig && chain.id !== selectedChainConfig.chainId && (
          <div className="p-3 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-md border border-yellow-200">
            Your wallet is connected to {chain.name}, but you've selected {selectedChainConfig.name} for deployment.
            Please switch your wallet's network to {selectedChainConfig.name} or select {chain.name} above.
          </div>
        )}

        {selectedChainConfig ? (
          <TokenForm selectedChain={selectedChainConfig} />
        ) : (
          <p className="text-gray-500">Please select a network to proceed.</p>
        )}
      </div>

      {/* Placeholder for other dashboard sections */}
      {/* <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Deployed Tokens</h2>
        <p className="text-gray-600">List of tokens you've launched...</p>
      </div> */}
    </div>
  );
}

export default Dashboard;
