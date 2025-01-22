import React from 'react';
import { config } from './config';
import { WagmiProvider } from 'wagmi';

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WalletProvider;
