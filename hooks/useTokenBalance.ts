import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { erc20ABI } from '../abis/erc20'; // Adjust path if necessary
import { useWeb3React } from '@web3-react/core';

// Replace with your actual token contract address
const TOKEN_CONTRACT_ADDRESS = "0xYourTokenContractAddress"; 

export const useTokenBalance = () => {
  const { account, provider } = useWeb3React();
  const [balance, setBalance] = useState('0');

  const fetchBalance = useCallback(async () => {
    if (provider && account) {
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, erc20ABI, signer);
      try {
        const newBalance = await tokenContract.balanceOf(account);
        setBalance(ethers.utils.formatUnits(newBalance, 18)); // Assuming 18 decimals
      } catch (error) {
        console.error("Error fetching token balance:", error);
      }
    }
  }, [provider, account]);

  useEffect(() => {
    if (provider && account) {
      // Fetch initial balance
      fetchBalance();

      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, erc20ABI, signer);
      
      // Listen for Transfer events to the user's address
      const filter = tokenContract.filters.Transfer(null, account);

      const listener = (from, to, value) => {
        console.log('Transfer event detected, updating balance...');
        fetchBalance();
      };

      tokenContract.on(filter, listener);

      // Cleanup listener on component unmount
      return () => {
        tokenContract.off(filter, listener);
      };
    }
  }, [provider, account, fetchBalance]);

  return balance;
};
