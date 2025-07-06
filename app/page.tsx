"use client"
import { Footer, Hero, Navbar } from '@/components'
import React, { useState, useEffect, JSX } from 'react'
import * as fcl from "@onflow/fcl";
import "../flow/config";


interface AccountData {
  addr: string;
  balance: number;
  code: string;
  keys: any[];
}

export default function Home(): JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    fcl.currentUser.subscribe((user: any) => {
      if (user?.addr) {
        setIsConnected(true);
        setAccount(user.addr);
      } else {
        setIsConnected(false);
        setAccount(null);
      }
    });
  }, []);

  const handleClick = async (): Promise<void> => {
    try {
      const user = await fcl.authenticate();
      console.log({ user });
      
      if (user?.addr) {
        const accountData = await fcl.account(user.addr);
        const result: AccountData = {
          addr: user.addr,
          balance: accountData.balance,
          code: String(accountData.code),
          keys: accountData.keys,
        };
        console.log({ result });
        const flowBalance = result.balance / Math.pow(10, 8); // Updated to 8 decimal places
        console.log({ flowBalance });
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleDisconnect = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      const confirmDisconnect = window.confirm('Are you sure you want to disconnect?');
      if (confirmDisconnect) {
        await fcl.unauthenticate();
      }
    }
  };

  return (
    <main className="overflow-hidden relative">
      <Navbar isConnected={isConnected} account={account} onDisconnect={handleDisconnect} onConnect={handleClick} />
      <Hero isConnected={isConnected} onClick={handleClick} />
      <Footer isConnected={isConnected} onClick={handleClick} />
    </main>
  );
}