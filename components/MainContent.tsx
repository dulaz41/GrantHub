"use client"
import React, { useState } from "react";
import { FilterButtonProps, MenuProps, ChartData } from "../interface/interface";
import wallet from '../public/assets/wallet.png';
import handcash from '../public/assets/handcash.png';
import line from '../public/assets/line.png';
import up from '../public/assets/up.png';
import user from '../public/assets/Ellipse.png';
import copy from '../public/assets/copy.png';
import paste from '../public/assets/paste.png';
import Image from "next/image";
import BarChart from "./BarChart";
import { UserData } from '../Data'
import Dashboard from "./Dashboard";
import ActiveProposal from "../app/activeproposal/ActiveProposal";
import Project from "../app/project/Project";
import Campaign from "../app/campaign/Campaign";
import SubmitProposal from "./SubmitProposal";
import Profile from "./Profile";
import Proposals from "../app/proposal/Proposals";




const MainContent: React.FC<{ activeItem: string }> = ({ activeItem }, { labels, datasets }: ChartData) => {
    const renderContent = () => {
        switch (activeItem) {
            case "home":
                return <Dashboard />;
            case "item_1":
                return <ActiveProposal />;
            case "item_2":
                return <Project />;
            case "item_3":
                return <Proposals />;
            case "item_4":
                return <Campaign />;
            case "item_5":
                return <SubmitProposal />;
            case "item_6":
                return <Profile />;
            default:
                return null;
        }
    };

    return (
        <div className={`main-content w-[100%]  md-custom:w-[75%] flex justify-end overflow-x-auto`}>
            <div className={`w-[95%]`}>
                {renderContent()}
            </div>
        </div>
    );
};

export default MainContent;