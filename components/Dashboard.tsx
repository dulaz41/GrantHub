"use client"
import React, { useEffect, useState } from "react";
import handcash from '../public/assets/handcash.png';
import wallet1 from '../public/assets/wallet.png';
import line from '../public/assets/line.png';
import up from '../public/assets/up.png';
import up2 from '../public/assets/up2.png';
import user from '../public/assets/Ellipse.png';
import copy from '../public/assets/copy.png';
import paste from '../public/assets/paste.png';
import Image from "next/image";
import BarChart from "./BarChart";
import { UserData } from '../Data'
import { ChartData } from "../interface/interface";
import logo from "../public/images/logo.png";
import * as fcl from "@onflow/fcl";

// Dynamic import for FCL config to avoid SSR issues
if (typeof window !== 'undefined') {
  import("../flow/config");
}


const Dashboard: React.FC<ChartData> = ({ labels, datasets }: ChartData) => {
    const [userData, setUserData] = useState<ChartData>({
        labels: UserData.map((data) => data.month),
        datasets: [
            {
                label: "Revenue",
                data: UserData.map((data) => data.userGain),

            },
        ],

    })
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [walletBalance, setWalletBalance] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const wallet = await fcl.logIn();

            console.log({ wallet });
            // console.log(wallet.addr);
            const result = await fcl.account(wallet.addr);
            // console.log({ result });
            const flowBalance = result.balance / Math.pow(10, 4);
            // console.log({ flowBalance });

            
            setWalletBalance(flowBalance);
        };

        fetchData();
    }, []);

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
        <>
            <div className="flex flex-col sm-custom:bg-[#BCD7CB] mt-[68px]  w-full">
                <header className="fixed inset-x-0 mb-12 top-0 sm-custom:z-50">
                    <nav
                        className={`flex items-center justify-between p-6  ${isScrollingUp ? "bg-white" : "bg-white"
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
                <div className="w-[98%] sm-custom:w-[100%] lg:flex justify-between px-4 lg:bg-cover   items-center " style={{ backgroundImage: `url('/images/dashframe.png')` }} >
                    <div className="flex flex-col justify-center  h-[64px] " >
                        <p className=" lg:text-[24px] text-base text-white -mb-2">Welcome, Innovator ✨</p>
                    </div>
                </div>
                <div className='lg:w-[100%] w-[112%]    -mr-0 mt-0  bg-white h-[20px]'></div>
                <div className="lg:w-[100%] w-[85%] sm-custom:bg-[#BCD7CB] lg:mt-2 flex">
                    <div className="w-[70%]   grid grid-cols-2 gap-4">
                        <div className="bg-[#21B074]  lg:px-[21px] py-[40px] px-[20px] lg:m-[24px] mb-0  lg:w-[300px] lg:h-[206px] w-[184px] h-[160px]  ">
                            <div className="flex items-center ml-[4px] ">
                                <Image src={wallet1} alt="" className="lg:h-[32px]  lg:w-[32px] h-[16px] w-[16px] " />
                                <p className="ml-[20px] text-black text-[14px] font-semibold "><span className="lg:inline-flex hidden">Wallet</span> Balance</p>
                                <Image src={line} alt="" className="h-[32px] lg:ml-[74px] ml-[20px] w-[32px]" />
                            </div>
                            <div className="flex flex-col lg:mt-[25px] lg:ml-0 -ml-[12px] items-center">
                                <p className=" text-black lg:text-[18px] text-[15px] text-center font-semibold ">$FLOW {walletBalance}</p>
                            </div>
                            <div className="flex items-center lg:ml-[65px] ml-2 justify-start">
                                <Image src={up} alt="" className="h-[12px]  w-[12px]" />
                                <p className=" text-[white] text-[12px] text-center font-semibold ">+35.74%</p>
                            </div>
                        </div>
                        <div className="sm-custom:bg-white bg-[#BCD7CB] lg:px-[21px] py-[40px] px-[20px] lg:m-[24px] sm-custom:ml-[30px] ml-[67px] mb-0  lg:w-[300px] lg:h-[206px] w-[184px] h-[160px] ">
                            <div className="flex items-center ml-[4px]">
                                <Image src={handcash} alt="" className="lg:h-[32px]  lg:w-[32px] h-[16px] w-[16px]" />
                                <p className="ml-[20px] text-black text-[14px] font-semibold ">Spent</p>
                                <Image src={line} alt="" className="h-[32px] lg:ml-[134px] ml-[20px] w-[32px]" />
                            </div>
                            <div className="flex flex-col lg:mt-[25px] lg:ml-0 -ml-[12px] items-center">
                                <p className=" text-black lg:text-[18px] text-[15px] text-center font-semibold ">$FLOW 0</p>
                            </div>
                            <div className="flex items-center lg:ml-[71px] ml-[14px]  justify-start">
                                <Image src={up2} alt="" className="h-[12px]  w-[12px]" />
                                <p className=" text-[#53D258] text-[12px] text-center font-semibold ">+8.74%</p>
                            </div>
                        </div>
                        <div className="col-span-2 bg-white lg:w-[630px] sm-custom:w-[630px]  lg:h-[313px] w-[395px] h-3[25px] lg:m-[24px] lg:mt-4 sm-custom:px-[18px] py-[16px] sm-custom:py-[8px]">
                            <h2 className="text-[#00EF8B] lg:text-[24px] text-[16px] font-semibold">Funding history</h2>
                            <div className="flex flex-col mt-[12px] gap-y-[12px]">
                                <div className="lg:h-[75px] h-[56px] lg:w-[584px] w-[368px] border-[2px] flex justify-between   border-[#00EF8B] p-[8px] ">
                                    <div className="space-x-3 flex ">
                                        <Image src={user} alt="" className="h-[31px] mt-1  w-[31px]" />
                                        <div className="flex lg:gap-y-[10px]  flex-col">
                                            <h3 className="text-[#00EF8B] lg:text-[16px] text-[14px] font-semibold">AbdulAzeez Tasleem</h3>
                                            <p className=" text-[#626262] text-[14px] text-center font-semibold ">Blockchain education cohort</p>
                                        </div>
                                    </div>
                                    <p className=" text-black text-[18px] lg:inline-flex hidden text-center font-semibold ">$FLOW 500,000</p>
                                </div>
                                <div className="lg:h-[75px] h-[56px] lg:w-[584px] w-[368px] border-[2px] flex justify-between  border-[#00EF8B] p-[8px]">
                                    <div className="space-x-3 flex ">
                                        <Image src={user} alt="" className="h-[32px] mt-1  w-[32px]" />
                                        <div className="flex lg:gap-y-[10px] flex-col">
                                            <h3 className="text-[#00EF8B] lg:text-[16px] text-[14px] font-semibold">AbdulAzeez Tasleem</h3>
                                            <p className=" text-[#626262] text-[14px] text-center font-semibold ">NFT marketplace application </p>
                                        </div>
                                    </div>
                                    <p className=" text-black text-[18px] lg:inline-flex hidden text-center font-semibold ">$FLOW 500,000</p>
                                </div>
                                <div className="lg:h-[75px] h-[56px] lg:w-[584px] w-[368px] border-[2px] flex justify-between  border-[#00EF8B] p-[8px]">
                                    <div className="space-x-3 flex ">
                                        <Image src={user} alt="" className="h-[32px] mt-1  w-[32px]" />
                                        <div className="flex lg:gap-y-[10px] flex-col">
                                            <h3 className="text-[#00EF8B] lg:text-[16px] text-[14px] font-semibold">AbdulAzeez Tasleem</h3>
                                            <p className=" text-[#626262] text-[14px] text-center font-semibold ">Agricultural produce distribution platform
                                            </p>
                                        </div>
                                    </div>
                                    <p className=" text-black text-[18px] lg:inline-flex hidden text-center font-semibold ">$FLOW 500,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[30%] w-[20%] sm-custom:flex hidden sm-custom:flex-col lg:mx-[18px]   ">
                        <div className="bg-white px-[16px] py-[15px] lg:m-[24px] ml-[54px] lg:w-[267px] sm-custom:w-[267px] w-[181px] h-[116px] ">
                            <div className="flex mb-2 justify-center items-center">
                                <h3 className="text-[#00EF8B] lg:text-[16px] text-[14px] text-center font-semibold">Deposit</h3>
                            </div>
                            <div className="flex lg:justify-between border-[2px] border-[#00EF8B] lg:p-2 lg:w-[100%] w-[160px] h-[48px] items-center ">
                                <input type="text" className="m-4 ml-0 w-[115px]  outline-none " placeholder="0998XXXGDEI584J" />
                                <Image src={copy} alt="" className="h-[20px] cursor-pointer w-[20px]" />
                            </div>

                        </div>
                        <div className="bg-white px-[16px] py-[15px] flex flex-col justify-center items-center  gap-y-4 lg:m-[24px] ml-[54px] lg:w-[270px] lg:h-[240px] w-[180px] h-[210px] ">
                            <div className="flex justify-center items-center">
                                <h3 className="text-[#00EF8B] lg:text-[16px] text-[14px] text-center font-semibold">Withdraw</h3>
                            </div>
                            <div className="flex lg:justify-between border-[2px] border-[#00EF8B] lg:p-2 lg:w-[100%] w-[160px] h-[48px] items-center ">
                                <input type="text" className="m-4 ml-0 w-[115px] outline-none " placeholder="0998XXXGDEI584J" />
                                <Image src={paste} alt="" className="h-[20px] cursor-pointer w-[20px]" />
                            </div>
                            <div className="flex lg:justify-between border-[2px] border-[#00EF8B] lg:p-2 lg:w-[100%] w-[160px] h-[48px] items-center ">
                                <input type="number" className="m-4 ml-0 w-[115px]  outline-none" placeholder="1.734" />
                            </div>
                            <button className="bg-[#00EF8B]  lg:h-[40px] lg:w-[186px]  w-[111px] p-2 h-[40px] ">
                                <p className="text-black lg:text-[14px] text-[12px] font-semibold ">Withdraw FTM</p>
                            </button>
                        </div>
                        <div className="bg-white flex justify-center items-center lg:m-[24px] ml-[54px] lg:w-[270px] lg:h-[122px] w-[180px] h-[110px] ">
                            <div className="flex flex-col gap-y-3 items-center">
                                <h3 className="text-[#00EF8B] text-[16px] text-center font-semibold">Current price</h3>
                                <div className="flex flex-col">
                                    <p className=" text-[#A9A9A9] text-center text-[14px] font-semibold ">$FLOW</p>
                                    <h3 className="text-black text-[18px] text-center font-semibold">12,133,245.6</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm-custom:w-[30%] flex flex-col sm-custom:hidden -mb-28 sm-custom:mx-[18px]">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                        <div className="bg-white px-4 py-3 mb-4 sm:mb-0 sm:w-[250px] w-[181px] h-[116px]">
                            <div className="flex mb-2 justify-center items-center">
                                <h3 className="text-[#00EF8B] text-[14px] font-semibold text-center">
                                    Deposit
                                </h3>
                            </div>
                            <div className="flex justify-between border-[2px] w-[168px] border-[#00EF8B] p-2 h-[48px] items-center">
                                <input
                                    type="text"
                                    className="m-4 ml-0 w-[115px] outline-none"
                                    placeholder="0998XXXGDEI584J"
                                />
                                <Image src={copy} alt="" className="h-[20px] cursor-pointer w-[20px]" />
                            </div>
                        </div>
                        <div className="bg-white px-4 py-3 flex flex-col justify-center ml-3 items-center gap-y-4 sm:w-[270px] sm:h-[240px] w-[180px] h-[210px]">
                            <div className="flex justify-center items-center">
                                <h3 className="text-[#00EF8B] text-[14px] font-semibold text-center">
                                    Withdraw
                                </h3>
                            </div>
                            <div className="flex justify-between border-[2px] w-[168px] border-[#00EF8B] p-2 h-[48px] items-center">
                                <input
                                    type="text"
                                    className="m-4 ml-0 w-[115px] outline-none"
                                    placeholder="0998XXXGDEI584J"
                                />
                                <Image src={paste} alt="" className="h-[20px] cursor-pointer w-[20px]" />
                            </div>
                            <div className="flex justify-between border-[2px] w-[168px] border-[#00EF8B] p-2 h-[48px] items-center">
                                <input
                                    type="number"
                                    className="m-4 ml-0 w-[115px] outline-none"
                                    placeholder="1.734"
                                />
                            </div>
                            <button className="bg-[#00EF8B] h-[40px] w-[111px] p-2">
                                <p className="text-black text-[12px] font-semibold">Withdraw FTM</p>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white relative flex justify-center  items-center -top-60 left-48   w-[180px] h-[110px]">
                        <div className="flex flex-col gap-y-3 items-center">
                            <h3 className="text-[#00EF8B] text-[16px] text-center font-semibold">
                                Current price
                            </h3>
                            <div className="flex flex-col">
                                <p className="text-[#A9A9A9] text-[14px] text-center font-semibold">
                                    $FLOW
                                </p>
                                <h3 className="text-black text-[18px] text-center font-semibold">
                                    12,133,245.6
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:m-[24px] pt-3  mb-0 lg:w-[95%] w-full mt-0">
                    <div className="bg-[#00EF8B] flex items-center h-[56px]">
                        <p className="ml-[25px] text-black   text-[24px] text-center font-semibold ">Overview</p>
                    </div>
                    <div className="w-[100%]  flex justify-center items-center  bg-white">
                        <BarChart chartData={userData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard