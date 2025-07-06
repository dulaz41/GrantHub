"use client";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Image from "next/image";
import logo from "../../public/images/logo.png";

const categories = [
  {
    id: 1,
    name: "Dashboard",
  },
  {
    id: 2,
    name: "Active proposals",
  },
  {
    id: 3,
    name: "Projects",
  },
  {
    id: 4,
    name: "Campaign",
  },
  {
    id: 5,
    name: "Profile",
  },
];

const Page = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const handleTabChange = (index: any) => {
    setSelectedTab(index);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <div className="flex flex-row  lg:pt-[28px]">
      <header className="fixed inset-x-0 mb-12 top-0 sm-custom:z-50">
        <nav
          className={`flex  items-center justify-between p-6  ${
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
        </nav>
      </header>
      {/*dashboard sidebar*/}
      <Sidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        setActiveItem={setActiveItem}
        activeItem={activeItem}
      />
      <MainContent activeItem={activeItem} />
    </div>
  );
};

export default Page;
