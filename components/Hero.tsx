/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import money from '../public/assets/money.png'
import file from '../public/assets/file.png'
import people from '../public/assets/people.png'
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import greet from '../public/images/greet.png'
import Footer from './Footer';
import * as fcl from "@onflow/fcl";
import "../flow/config";


const features = [
  {
    description:
      "Funding Opportunities: Granthub offers funders the chance to support innovative projects within the Flow ecosystem, providing financial resources to drive their development, adoption, and success.",
    url: money,
  },
  {
    description:
      "Transparent Evaluation Process: Granthub implements a rigorous and transparent evaluation process to assess project proposals, ensuring that funded projects are aligned with the ecosystem's goals and have the potential to make a significant impact.",
    url: file,
  },
  {
    description:
      " Community Engagement: Granthub encourages community participation through voting and governance mechanisms, allowing stakeholders to have a voice in the funding decisions, project selection, and shaping the future of the Flow ecosystem.",
    url: people,
  }
]

interface HeroProps {
  isConnected: boolean;
  onClick: () => Promise<void>;
}

const Hero: React.FC<HeroProps> = ({ isConnected, onClick }) => {


  const wordContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = wordContainerRef.current;

    let currentIndex = 0;
    const words = ["Discover", "Collaborate", "Propose", "Invest"];
    const duration = 2000; // Duration for each word (in milliseconds)

    const animateWords = () => {
      const currentWord = words[currentIndex];
      const wordElement = container?.querySelector(".scroll-word");

      if (wordElement) {
        wordElement.textContent = currentWord;

        // Animate the word


        setTimeout(() => {
          wordElement.animate(
            [
              { transform: "translateY(100%)", opacity: 0 },
              { transform: "translateY(0%)", opacity: 1 },
            ],
            { duration }
          );
        }, 100);

        setTimeout(() => {
          wordElement.animate(
            [
              { transform: "translateY(0%)", opacity: 1 },
              { transform: "translateY(-100%)", opacity: 0 },
            ],
            { duration }
          );
        }, duration + 100);
      }

      currentIndex = (currentIndex + 1) % words.length;
    };

    // Start the animation
    animateWords();
    const interval = setInterval(animateWords, duration * 2);

    // Clean up the interval when component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='flex flex-col'>
      <div className=' lg:pt-24 lg:pb-8 lg:px-8 lg:bg-cover flex-shrink-0  lg:bg-no-repeat ' style={{ backgroundImage: `url('/images/Frame.png')` }}>
        <div className="lg:mx-auto px-2 lg:pt-[38px] ">
          <div className="lg:text-center text-center lg:flex flex flex-col justify-center  lg:flex-col" >
            <motion.h1
              className="text-xs mt-20 lg:mt-0 font-bold tracking-tight text-center items-center text-white md:text-xl lg:text-5xl"
              whileHover={{ scale: 1, rotate: 0 }}
            >
              Become a member of a thriving community of trailblazers, where investors fuel the future and innovators bring their ideas to life.
            </motion.h1>
            <div className='text-white  lg:text-[42px] mt-5 font-semibold ' ref={wordContainerRef}>
              <AnimatePresence>
                <motion.span
                  className="scroll-word"
                  initial={{ opacity: 0, translateY: "100%" }}
                  animate={{ opacity: 1, translateY: "0%" }}
                  exit={{ opacity: 0, translateY: "-100%" }}
                  transition={{ duration: 0.5 }}
                  key="scroll-word"
                />
              </AnimatePresence>
            </div>
            <p className="mx-auto mt-6 lg:max-w-3xl max-w-xs font-semibold text-[10px] lg:text-lg leading-8 text-white">
              Unleash your vision to drive success by funding and proposing revolutionary projects today!
            </p>
            <div className="lg:mt-8 flex gap-x-2 mb-2  lg:justify-center items-center justify-center ">
              <Link 
                href={isConnected ? "/dashboard" : "#"}
                onClick={() => {
                  if (!isConnected) {
                    alert("Please connect to your wallet before you proceed");
                  }
                }}
                className="rounded-md bg-white lg:text-xl text-base lg:px-7 p-2 lg:py-5 justify-center cursor-pointer flex font-medium text-[#00EF8B] shadow-sm hover:bg-[#00EF8B] hover:text-white"
              >
                Get started
                <span className="text[#00EF8B] hover:text-white ml-2 bg-inherit" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=' flex flex-col mt-6   '>
        <div className='lg:mb-[25px] mb-[5px]'>
          <h4 className='font-semibold lg:mx-auto lg:max-w-6xl ml-[15px] text-xl justify-start lg:text-4xl'>Why Granthub </h4>
        </div>
        <div>
          <div className="lg:mx-auto lg:mt-10 mt-[15px] lg:max-w-6xl mx-[15px] lg:space-y-3  flex-shrink-0 space-y-2 flex flex-col lg:gap-y-4 ">
            <p className='text-[11px] font-semibold lg:font-normal lg:text-base   text-[#303030]'>Welcome to Granthub, the premier platform that connects visionary funders and passionate proposers to catalyze groundbreaking projects within the Flow ecosystem. Whether you&apos;re seeking funding for your innovative idea or looking to support cutting-edge ventures, Granthub is the gateway to unlock limitless possibilities.
            </p>
            <p className='text-[11px] font-semibold lg:font-normal lg:text-base  text-[#303030]'>Our platform fosters collaboration, transparency, and growth, enabling you to make a lasting impact in the world of blockchain technology.
              Connect with like-minded individuals who share your passion for innovation. With Granthub, you have the power to shape the landscape of blockchain and create a legacy of transformable projects.</p>
            <p className='text-[11px] font-semibold lg:font-normal lg:text-base  text-[#303030]'>
              Don&apos;t wait any longer. Take the first step towards revolutionizing the blockchain industry by getting started with Granthub today. Together, let&apos;s unleash the potential of tomorrow and make your vision a reality.
            </p>
          </div>
        </div>
      </div>
      <div className=' flex mb-[35px] flex-col mt-6'>
        <div className='lg:mb-[50px] mb-[5px] '>
          <h4 className='font-semibold lg:mx-auto lg:max-w-6xl ml-[15px]  text-xl justify-start lg:text-4xl'>How it works</h4>
        </div>
        <div className='lg:flex lg:mx-auto flex mx-auto items-center justify-center -ml-3 mr-6  lg:pl-[134px] lg:pr-[143px] '>
          <div className=" grid relative left-5 justify-center  items-center my-6  lg:max-w-6xl grid-cols-1 lg:gap-y-7 gap-y-3">
            <div className="lg:max-w-xl max-w-screen-xl bg-[#00EF8B]">
              <p className='text-center text-black py-[20px] px-[45.5px] lg:text-base text-xs '>
                Project creators submit their proposals to Granthub, outlining their innovative ideas, project scope, timeline, and funding requirements. The proposals undergo a thorough evaluation process by the funder(s) to assess
              </p>
            </div>
            <div className="lg:max-w-xl max-w-screen-xl  bg-[#00EF8B]">
              <p className='text-center text-black py-[20px] px-[45.5px] lg:text-base text-xs'>
                Once project proposals are approved, funders can participate in the funding allocation process individually or seek partnerships by creating campaigns and stating their desired contribution amount on Granthub.
              </p>
            </div>
            <div className="lg:max-w-xl max-w-screen-xl bg-[#00EF8B]">
              <p className='text-center text-black py-[20px] px-[45.5px] lg:text-base text-xs '>
                Funders can explore campaigns on Granthub, partnering to fund promising projects after thorough review of feasibility, business opportunities, and wealth creation.
              </p>
            </div>
          </div>
          <div className="aspect-h-3 border-8 justify-center items-center  lg:flex hidden  border-[#00EF8B] aspect-w-2 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <Image
              src={greet}
              alt='image'
              className="h-full w-full  object-cover object-center"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <div className='mb-[35px]'>
        <div className='mb-[50px]'>
          <h4 className='font-semibold lg:mx-auto lg:max-w-6xl ml-[15px] text-xl justify-start lg:text-4xl'>Key features</h4>
        </div>
        <div className="mt-20 lg:mx-auto ml-4 mr-4 lg:max-w-6xl ">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3 lg:grid-cols-3 md:gap-x-12 md:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.description}
                className="flex justify-center items-center flex-col gap-6  md:flex-col lg:flex-col"
              >
                <div className="flex lg:h-[141px] lg:w-[170px]  align-middle items-center justify-center rounded-md bg-[#BCD7CB] text-white sm:shrink-0">
                  <div className="h-[108px] lg:flex flex align-middle items-center justify-center w-[94px]">
                    <Image src={feature.url} className='align-middle items-center justify-center ' alt="icon" />
                  </div>
                </div>
                <div className="sm:min-w-0  lg:flex lg:flex-shrink-0 text-center justify-center  sm:flex-1">
                  <p className="mt-2 lg:text-sm text-xs max-h-[168px] max-w-[310px] my-auto text-center justify-center leading-7 text-[#101010]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     
    </section>

  )
}

export default Hero