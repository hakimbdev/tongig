import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../app/services/api';
import { TonClient, Address } from '@ton/ton';

const tonApi = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});

export function useTonWalletConnect() {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const isConnected = !!wallet;

  // Wallet balance state
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Automatically create a user profile on wallet connect
  useEffect(() => {
    if (wallet && wallet.account?.address) {
      api.createOrGetUserProfile(wallet.account.address);
    }
  }, [wallet]);

  // Fetch wallet balance when connected
  useEffect(() => {
    async function fetchBalance() {
      if (wallet && wallet.account?.address) {
        setBalanceLoading(true);
        try {
          const address = Address.parse(wallet.account.address);
          const res = await tonApi.getBalance(address);
          setBalance((Number(res) / 1e9).toFixed(4)); // TON, 4 decimals
        } catch (e) {
          setBalance(null);
        } finally {
          setBalanceLoading(false);
        }
      } else {
        setBalance(null);
      }
    }
    fetchBalance();
  }, [wallet]);

  const connect = useCallback(() => {
    tonConnectUI.openModal();
  }, [tonConnectUI]);

  const disconnect = useCallback(() => {
    tonConnectUI.disconnect();
  }, [tonConnectUI]);

  return {
    wallet,
    tonConnectUI,
    userFriendlyAddress,
    isConnected,
    connect,
    disconnect,
    balance,
    balanceLoading,
  };
} 