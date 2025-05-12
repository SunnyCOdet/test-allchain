import React, { useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

const TokenForm = ({ selectedChain }) => {
  const { address, isConnected } = useAccount();
  const { chain: activeChain } = useNetwork(); // Wallet's currently active chain

  const [tokenDetails, setTokenDetails] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    // Tokenomics - basic placeholders
    taxFee: '0', // Percentage
    liquidityFee: '0', // Percentage
    marketingWallet: '',
    burnFee: '0', // Percentage
  });
  const [advancedFeatures, setAdvancedFeatures] = useState({
    antiBot: false,
    tradingLimits: false,
    blacklistWhitelist: false,
    lockVesting: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ message: '', type: '' }); // type: 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in tokenDetails) {
      setTokenDetails(prev => ({ ...prev, [name]: value }));
    } else if (name in advancedFeatures) {
      setAdvancedFeatures(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      setSubmissionStatus({ message: 'Please connect your wallet.', type: 'error' });
      return;
    }
    if (!selectedChain || activeChain?.id !== selectedChain.chainId) {
      setSubmissionStatus({ message: \`Please ensure your wallet is connected to ${selectedChain?.name || 'the selected network'}.\`, type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus({ message: '', type: '' });

    const payload = {
      chain: selectedChain.id, // e.g., 'ethereum', 'bsc'
      ...tokenDetails,
      totalSupply: Number(tokenDetails.totalSupply), // Ensure it's a number
      tokenomics: {
        taxFee: Number(tokenDetails.taxFee),
        liquidityFee: Number(tokenDetails.liquidityFee),
        marketingWallet: tokenDetails.marketingWallet,
        burnFee: Number(tokenDetails.burnFee),
      },
      advancedFeatures,
      deployerAddress: address,
    };

    try {
      const response = await fetch('/api/token/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create token.');
      }
      setSubmissionStatus({ message: \`Success: ${data.message}\`, type: 'success' });
      // Optionally reset form or redirect
    } catch (error) {
      setSubmissionStatus({ message: \`Error: ${error.message}\`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm";
  const commonLabelClass = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Token Details for {selectedChain.name}</h3>
        <p className="mt-1 text-sm text-gray-500">Define the core properties of your new token.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className={commonLabelClass}>Token Name</label>
          <input type="text" name="name" id="name" value={tokenDetails.name} onChange={handleInputChange} required className={commonInputClass} placeholder="e.g., My Awesome Token" />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="symbol" className={commonLabelClass}>Token Symbol</label>
          <input type="text" name="symbol" id="symbol" value={tokenDetails.symbol} onChange={handleInputChange} required className={commonInputClass} placeholder="e.g., MAT" />
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="totalSupply" className={commonLabelClass}>Total Supply</label>
          <input type="number" name="totalSupply" id="totalSupply" value={tokenDetails.totalSupply} onChange={handleInputChange} required className={commonInputClass} placeholder="e.g., 1000000000" />
        </div>
      </div>

      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Tokenomics (Basic)</h3>
        <p className="mt-1 text-sm text-gray-500">Configure fees and allocations. (Note: These are UI placeholders; backend contract needs full implementation).</p>
      </div>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label htmlFor="taxFee" className={commonLabelClass}>Transaction Tax (%)</label>
          <input type="number" name="taxFee" id="taxFee" value={tokenDetails.taxFee} onChange={handleInputChange} className={commonInputClass} placeholder="e.g., 5" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="liquidityFee" className={commonLabelClass}>Auto-Liquidity Fee (%)</label>
          <input type="number" name="liquidityFee" id="liquidityFee" value={tokenDetails.liquidityFee} onChange={handleInputChange} className={commonInputClass} placeholder="e.g., 3" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="burnFee" className={commonLabelClass}>Burn Fee (%)</label>
          <input type="number" name="burnFee" id="burnFee" value={tokenDetails.burnFee} onChange={handleInputChange} className={commonInputClass} placeholder="e.g., 1" />
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="marketingWallet" className={commonLabelClass}>Marketing Wallet Address</label>
          <input type="text" name="marketingWallet" id="marketingWallet" value={tokenDetails.marketingWallet} onChange={handleInputChange} className={commonInputClass} placeholder="0x..." />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Advanced Features (Conceptual)</h3>
        <p className="mt-1 text-sm text-gray-500">Toggle advanced functionalities. (Note: UI placeholders; requires significant smart contract work).</p>
      </div>
      <div className="space-y-4">
        {Object.keys(advancedFeatures).map(key => (
          <div key={key} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={key}
                name={key}
                type="checkbox"
                checked={advancedFeatures[key]}
                onChange={handleInputChange}
                className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={key} className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            </div>
          </div>
        ))}
      </div>

      {submissionStatus.message && (
        <div className={`p-3 rounded-md ${submissionStatus.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {submissionStatus.message}
        </div>
      )}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !isConnected || (activeChain?.id !== selectedChain.chainId)}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : `Create Token on ${selectedChain.name}`}
          </button>
        </div>
        {!isConnected && <p className="text-sm text-red-500 mt-2 text-right">Please connect your wallet to create a token.</p>}
        {isConnected && activeChain?.id !== selectedChain.chainId && <p className="text-sm text-red-500 mt-2 text-right">Your wallet is connected to {activeChain?.name}. Please switch to {selectedChain.name} to create the token.</p>}
      </div>
    </form>
  );
};

export default TokenForm;
