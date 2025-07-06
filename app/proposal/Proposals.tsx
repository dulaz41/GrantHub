import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import user from "../../public/assets/Ellipse2.png";
import Link from 'next/link';
import logo from "../../public/images/logo.png";


const projects = [
    {
        id: 0,
        name: 'AbdulAzeez Tasleem',
        title: 'Blockchain education cohort',
        description: "Don't wait any longer.Take the first step towards revolutionizing the blockchain industry by getting started with Flow Grant today.Together, let's unleash the potential of tomorrow and make your vision a reality.",
    },
    {
        id: 1,
        name: 'AbdulAzeez Tasleem',
        title: 'NFT marketplace application',
        description: "Don't wait any longer.Take the first step towards revolutionizing the blockchain industry by getting started with Flow Grant today.Together, let's unleash the potential of tomorrow and make your vision a reality.",
    },
    {
        id: 2,
        name: 'AbdulAzeez Tasleem',
        title: 'NFT marketplace application',
        description: "Don't wait any longer.Take the first step towards revolutionizing the blockchain industry by getting started with Flow Grant today.Together, let's unleash the potential of tomorrow and make your vision a reality.",
    }
]

const Proposals = () => {

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
        <>
            <div className="flex items-start flex-col bg-white w-[100%] mt-[68px]  -ml-4">
                <header className="fixed inset-x-0 mb-12 top-0 sm-custom:z-50">
                    <nav
                        className={`flex  items-center justify-between p-6  ${isScrollingUp ? "bg-white" : "bg-white"
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
                <div className="w-[100%] lg:flex justify-between px-4 lg:bg-cover   items-center " style={{ backgroundImage: `url('/images/dashframe.png')` }} >
                    <div className="flex flex-col justify-center  h-[64px] " >
                        <p className=" lg:text-[24px] text-base text-white -mb-2">Welcome, Innovator ✨</p>
                    </div>
                </div>
                <div className="w-[100%] flex border-[2px] border-[#00EF8B] mt-[10px] p-[15px] flex-col">
                    <div className="flex flex-col lg:mt-[12px] mt-[18px]   gap-y-[12px]">
                        <h1 className='text-[#626262] text-[30px] font-semibold my-3 bg-white '>In campaign</h1>
                        <div className="lg:h-[100%] w-[100%]  justify-between overflow-x-auto ">
                            <div className="flex sm-custom:w-[3298px] w-[3000px]  gap-4">
                                {projects.map((project) => (
                                    <div key={project.id} className='bg-[#BCD7CB] p-[50px]   overflow-hidden w-auto ' >
                                        <div className='sm-custom:w-[760px] w-[300px] sm-custom:h-[390px] md-custom:h-[200px] lg:h-[390px]  h-[250px] '>
                                            <div className='flex justify-between '>
                                                <div className="space-x-6 flex items-center ">
                                                    <Image src={user} alt="" className="lg:h-[120px] mt-1 h-[50px] w-[50px] lg:w-[120px]" />
                                                    <div className="flex gap-y-[10px] flex-col">
                                                        <h3 className="text-white lg:text-[40px] text-[14px] font-semibold">{project.name}</h3>
                                                        <p className=" text-[#626262] lg:text-[30px] text-[12px] text-center font-semibold ">{project.title}</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col lg:pt-[18px] pt-[6px] sm-custom:gap-y-4'>
                                                    <p className=" text-black lg:text-[24px] text-[9px] text-center sm-custom:font-semibold font-bold ">$FLOW 500,000</p>
                                                </div>
                                            </div>
                                            <div className='my-[43px] lg:h-[116px] lg:w-[98%]'>
                                                <p className='text-[#303030] lg:text-2xl text-sm'>{project.description}</p>
                                            </div>
                                            <div className='flex justify-end  items-end'>
                                                <Link href="/proposal" legacyBehavior passHref>
                                                    <a className='text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] text-[20px] lg:text-[30px]'>View</a>
                                                </Link>
                                            </div>
                                        </div>
                                        {/* <div className='lg:w-[110%] w-[123%]   -ml-10 -mr-0 my-4  bg-white h-[30px]'></div> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col lg:mt-[12px] mt-[18px]   gap-y-[12px]">
                        <h1 className='text-[#626262] text-[30px] font-semibold my-3 bg-white '>Others</h1>
                        <div className="lg:h-[100%] w-[100%]  justify-between  ">
                            {projects.map((project) => (
                                <div key={project.id} className='bg-[#BCD7CB] p-[30px] ' >
                                    <div className='flex justify-between '>
                                        <div className="space-x-6 flex lg:items-center ">
                                            <Image src={user} alt="" className="lg:h-[120px] mt-1 h-[50px] w-[50px] lg:w-[120px]" />
                                            <div className="flex gap-y-[10px] flex-col">
                                                <h3 className="text-white lg:text-[40px] text-[14px] font-semibold">{project.name}</h3>
                                                <p className=" text-[#626262] lg:text-[30px] text-[12px] text-center font-semibold ">{project.title}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col lg:pt-[18px] pt-[6px] gap-y-4'>
                                            <p className=" text-black lg:text-[24px] text-[12px] text-center font-semibold ">$FLOW 500,000</p>
                                        </div>
                                    </div>
                                    <div className='my-[43px] lg:h-[116px] lg:w-[98%]'>
                                        <p className='text-[#303030] lg:text-2xl text-sm'>{project.description}</p>
                                    </div>
                                    <div className='flex justify-end  items-end'>
                                        <Link href="/project" legacyBehavior passHref>
                                            <a className='text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] text-[20px] lg:text-[30px]'>View</a>
                                        </Link>
                                    </div>
                                    <div className='lg:w-[109%] w-[124%]   -ml-10 -mr-0 my-4  bg-white h-[30px]'></div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Proposals