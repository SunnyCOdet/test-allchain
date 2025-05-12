import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useBalance } from 'wagmi';
import { formatEther } from 'viem'; // Using viem for formatting

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
    watch: true, // Watch for balance changes
  });

  return (
    <div className="flex items-center space-x-3">
      <ConnectButton 
        showBalance={{smallScreen: false, largeScreen: true}}
        chainStatus={{smallScreen: "icon", largeScreen: "full"}} 
        accountStatus={{smallScreen: "avatar", largeScreen: "full"}}
      />
      {/* {isConnected && chain && (
        <div className="hidden md:flex flex-col items-end text-xs text-gray-600">
          <span>{chain.name}</span>
          {isBalanceLoading && <span>Fetching balance...</span>}
          {balanceData && (
            <span>
              {parseFloat(formatEther(balanceData.value)).toFixed(4)} {balanceData.symbol}
            </span>
          )}
        </div>
      )} */}
    </div>
  );
};

export default WalletConnectButton;
