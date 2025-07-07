"use client"
import { Footer, Hero, Navbar } from '@/components'
import React, { useState, useEffect, JSX } from 'react'
import * as fcl from "@onflow/fcl";

// Dynamic import for FCL config to avoid SSR issues
if (typeof window !== 'undefined') {
  import("../flow/config");
}


interface AccountData {
  addr: string;
  balance: number;
  code: string;
  keys: any[];
}

export default function Home(): JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Handle mounting to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if user is already authenticated on mount
  useEffect(() => {
    if (!isMounted) return;
    
    // Only run FCL subscription on client side
    if (typeof window !== 'undefined') {
      fcl.currentUser.subscribe((user: any) => {
        if (user?.addr) {
          setIsConnected(true);
          setAccount(user.addr);
        } else {
          setIsConnected(false);
          setAccount(null);
        }
      });
    }
  }, [isMounted]);

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
    // Only run confirm() on the client side
    if (typeof window !== 'undefined') {
      const confirmDisconnect = confirm('Are you sure you want to disconnect?');
      if (confirmDisconnect) {
        await fcl.unauthenticate();
      }
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return <div className="overflow-hidden relative min-h-screen bg-white"></div>;
  }

  return (
    <main className="overflow-hidden relative">
      <Navbar isConnected={isConnected} account={account} onDisconnect={handleDisconnect} onConnect={handleClick} />
      <Hero isConnected={isConnected} onClick={handleClick} />
      <Footer isConnected={isConnected} onClick={handleClick} />
    </main>
  );
}