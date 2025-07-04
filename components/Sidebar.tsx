/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ImUsers } from "react-icons/im";
import { TbCameraPlus } from "react-icons/tb";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { SlHourglass } from "react-icons/sl";
import { MdOutlineDashboard, MdOutlineFilePresent } from "react-icons/md";
// import { IconType } from "react-icons/lib";
import { CgTrashEmpty } from "react-icons/cg";
import { IoMdAlarm } from "react-icons/io";
import { BsCollectionPlay } from "react-icons/bs";
import { HiCloudArrowUp } from "react-icons/hi2";
import logoImg from "../public/images/mainstack-logo.png";
import { Dashboard, ActiveProposal, Campaign, Profile, Project, SubmitProposal } from '@/components'

import { MenuProps } from "../interface/interface";
import { Image } from "@chakra-ui/next-js";

interface MenuItemProps {
    icon?: any;
    text: string;
    isActive?: string | boolean;
    badge?: string;
    onClick?: () => void;
}

const Sidebar: React.FC<MenuProps & { setActiveItem: (item: string) => void } & {activeItem: string} > = ({ isMenuOpen, toggleMenu, setActiveItem, activeItem  }) => {
      


    const MenuItem: React.FC<MenuItemProps> = ({
        icon,
        text,
        isActive,
        onClick,
        badge,
    }: MenuItemProps) => (
        <li
            className={`py-2 cursor-pointer  
      sidebar
      `}
            onClick={onClick}
        >
            {isActive ? (
                <div className="flex bg-[#F5F8FE] justify-between h-[38px]">
                    {isActive ? (
                        <div className="w-[4px] bg-[#00EF8B]  rounded-tr-lg rounded-br-lg"></div>
                    ) : (
                        <span></span>
                    )}
                    <span className="flex items-center text-[#56616B] flex-start w-[80%] space-x-2 px-4">
                        {icon &&
                            React.createElement(icon, {
                                size: 20,
                                className: `${onClick ? "text-base" : "text-[12px]"} ${isActive ? "text-[#00EF8B]" : ""
                                    }`,
                            })}
                        <span className={`${isActive ? "text-[#00EF8B] " : ""}`}>
                            <span
                                className={`${onClick ? "text-sm font-bold " : "text-[12px]"}`}
                            >
                                {text}
                            </span>
                            {badge && (
                                <span
                                    className={` rounded-full px-[5px] py-[2.5px] ml-10  text-xs ${isActive
                                        ? "text-[#00EF8B] bg-[#ede0da]"
                                        : "text-[#56616B] bg-[#EFF1F6]"
                                        }`}
                                >
                                    {badge}
                                </span>
                            )}
                        </span>
                    </span>
                </div>
            ) : (
                <div className="flex justify-between h-[38px]">
                    {isActive ? (
                        <div className="w-[4px] bg-[#00EF8B]   rounded-tr-lg rounded-br-lg"></div>
                    ) : (
                        <span></span>
                    )}
                    <span className="flex items-center text-[#56616B] flex-start w-[80%] space-x-2 px-4">
                        {icon &&
                            React.createElement(icon, {
                                size: 15,
                                className: `${onClick ? "text-base" : "text-[12px]"} ${isActive ? "text-[#00EF8B]" : ""
                                    }`,
                            })}
                            <span className={`${isActive ? "text-[#00EF8B] " : ""}`}>
                            <span
                                className={`${onClick ? "text-sm font-bold " : "text-[12px]"}`}
                            >
                                {text}
                            </span>
                            {badge && (
                                <span
                                    className={` rounded-full px-[5px] py-[2.5px] ml-10  text-xs ${isActive
                                        ? "text-[#00EF8B] bg-[#ede0da]"
                                        : "text-[#56616B] bg-[#EFF1F6]"
                                        }`}
                                >
                                    {badge}
                                </span>
                            )}
                        </span>
                    </span>
                </div>
            )}
        </li>
    );

   
    return (
        <div
            className={`md-custom:w-[25%]   w-0 sidebar overflow-y-auto ${!isMenuOpen ? "w-0" : "w-[300px] sm:w-full fixed md-custom:relative z-50 inset-0"
                }`}
        >
            {/* Menu button for small and medium devices */}
            <button
                className="block md-custom:hidden fixed z-50 right-0 top-0 mr-4 mt-6 text-[#00EF8B] hover:text-gray-800 focus:outline-none"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar container */}
            <aside
                className={`bg-white border-r-2 border-[#EFF1F6] h-screen md:w-auto flex flex-col justify-between`}
            >
                <div className="pt-[80px] flex flex-col ">

                    {/* Menu items */}
                    <ul className=" space-y-1.5">
                        <MenuItem
                            icon={MdOutlineDashboard}
                            text="Dashboard"
                            isActive={activeItem === "home"}
                            onClick={() => setActiveItem("home")}
                        />
                        <MenuItem
                            icon={SlHourglass}
                            text="Active proposals"
                            // badge="6"
                            isActive={activeItem === "item_1"}
                            onClick={() => setActiveItem("item_1")}
                        />
                        <MenuItem
                            icon={MdOutlineFilePresent}
                            text="Projects"
                            // badge="2"
                            isActive={activeItem === "item_2"}
                            onClick={() => setActiveItem("item_2")}
                        />
                        <MenuItem
                            icon={AiOutlineEllipsis}
                            text="Proposals"
                            // badge="2"
                            isActive={activeItem === "item_3"}
                            onClick={() => setActiveItem("item_3")}
                        />
                        <MenuItem
                            icon={BiPencil}
                            text="Campaign"
                            isActive={activeItem === "item_4"}
                            onClick={() => setActiveItem("item_4")}
                        />
                        <MenuItem
                            icon={HiCloudArrowUp}
                            text="Submit proposal"
                            isActive={activeItem === "item_5"}
                            onClick={() => setActiveItem("item_5")}
                        />
                        <MenuItem
                            icon={ImUsers}
                            text="Profile"
                            isActive={activeItem === "item_6"}
                            onClick={() => setActiveItem("item_6")}
                        />
                    </ul>


                </div>
            </aside>

        </div>
    );
};

export default Sidebar;