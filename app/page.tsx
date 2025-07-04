"use client"
import { Footer, Hero, Navbar } from '@/components'
import Image from 'next/image';
import React, {useState } from 'react'
import * as fcl from "@onflow/fcl";
import "../flow/config";


interface AccountData {
  addr: string ;
  balance: number;
  // Add any other properties you expect from the result
}

export default function Home(): JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  const handleClick = async (): Promise<void> => {
    fcl.unauthenticate();
    const wallet = await fcl.logIn();

    console.log({ wallet });
    console.log(wallet.addr);
    const result: AccountData = await fcl.account(wallet.addr);
    console.log({ result });
    const flowBalance = result.balance / Math.pow(10, 4);
    console.log({ flowBalance });

    setIsConnected(true);
    setAccount(wallet.addr);
  };

  const handleDisconnect = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      alert('Are you sure you want to disconnect?');
      fcl.unauthenticate();
      setIsConnected(false);
      setAccount(null);
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