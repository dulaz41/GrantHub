"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/images/logo.png";
// import Connect from './WalletConnect'

interface NavbarProps {
  isConnected: boolean;
  onDisconnect: () => Promise<void>;
  onConnect: () => Promise<void>;
  account: string | null;
}

const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  account,
  onDisconnect,
  onConnect,
}) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(currentScrollPos < prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 lg:mb-4 mb-3 top-0 z-50">
      <nav
        className={`flex  items-center justify-between lg:p-6 p-2  ${
          isScrollingUp ? "bg-white" : "bg-white"
        }`}
        aria-label="Global"
      >
        <div className="flex lg:min-w-0 lg:flex-1">
          <a href="/" className="-m-1.5 p-1">
            <span className="sr-only">Granthub</span>
            <Image
              className="flex-shrink-0 lg:w-[190px] lg:h-[72px] md:w-[182px] w-[120px] h-[55px] "
              src={logo}
              alt="logo"
            />
          </a>
        </div>
        <div className="lg:inline-flex">
          <button
            onClick={isConnected ? onDisconnect : onConnect}
            className="rounded-md bg-[#00EF8B] lg:text-xl md:text-xl text-[10px]  lg:px-5 lg:py-3 px-[20px] py-[10px]  justify-center  font-medium text-black shadow-sm hover:bg-[#07a261]"
          >
            {isConnected ? `${account?.slice(0, 8)}...` : "Connect to Flow"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
