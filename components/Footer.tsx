"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  isConnected: boolean;
  onClick: () => Promise<void>;
}


const Footer: React.FC<HeroProps> = ({ isConnected, onClick }) => {
  const wordContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = wordContainerRef.current;

    let currentIndex = 0;
    const words = ["As a project creator, submit your innovative ideas to Flow Grant for a chance to receive funding and support for your project within the Flow ecosystem.", "As a funder, you can actively provide financial support to innovative projects that align with your interests, investment criteria, and the development of the Flow ecosystem."];
    const duration = 2000; // Duration for each word (in milliseconds)
    const stopDuration = 3000; // Duration for the word to stay at the center (in milliseconds)

    const animateWords = () => {
      const currentWord = words[currentIndex];
      const wordElement = container?.querySelector(".scroll-word");

      if (wordElement) {
        wordElement.textContent = currentWord;



        setTimeout(() => {
          wordElement.animate(
            [
              { transform: "translateX(0%) translateY(0%)", opacity: 1 },
              { transform: "translateX(0%) translateY(0%)", opacity: 1 },
            ],
            { duration: stopDuration }
          );

          setTimeout(() => {
            wordElement.animate(
              [
                { transform: "translateX(0%) translateY(0%)", opacity: 1 },
                { transform: "translateX(0%) translateY(-100%)", opacity: 0 },
              ],
              { duration }
            );
          }, stopDuration);
        }, 100);
      }

      currentIndex = (currentIndex + 1) % words.length;
    };

    // Start the animation
    animateWords();
    const interval = setInterval(animateWords, duration + stopDuration * 1.5);

    // Clean up the interval when component is unmounted
    return () => clearInterval(interval);
  }, []);


  return (
    <footer>
      <div className='mt-[35px]  mb-[20px] mx-auto max-w-6xl'>
        <div className='lg:mb-[50px] mb-[10px]'>
          <h4 className='font-semibold lg:mx-auto lg:max-w-6xl ml-[15px] text-xl justify-start lg:text-4xl'>Get Involved</h4>
        </div>
        <div className=' lg:pt-12 lg:pb-8  lg:bg-contain lg:bg-center lg:bg-no-repeat ' style={{ backgroundImage: `url('/images/Footer.png')` }}>
          <div className="mx-auto py-1 lg:px-8">
            <div className="lg:text-center lg:flex  flex m-14  flex-col lg:flex-col" ref={wordContainerRef} >
              {/* <motion.h1
              className=""
              whileHover={{ scale: 1, rotate: 0 }}
            >
              As a project creator, submit your innovative ideas to Flow Grant for a chance to receive funding and support for your project within the Flow ecosystem.
            </motion.h1> */}
              <AnimatePresence>
                <motion.span
                  className="scroll-word text-xs text-center font-medium tracking-tight text-white lg:text-3xl"
                  initial={{ opacity: 0, translateX: "0%", translateY: "100%" }}
                  animate={{ opacity: 1, translateX: "0%", translateY: "0%" }}
                  exit={{ opacity: 0, translateX: "0%", translateY: "-50%" }}
                  transition={{ duration: 0.5 }}
                  key="scroll-word"
                />
              </AnimatePresence>
            </div>
            <div className="mt-3 flex mb-4 lg:justify-center items-center justify-center">
              <Link href={isConnected ? "/dashboard" : "#"} legacyBehavior passHref>
                <a
                  onClick={() => {
                    if (!isConnected) {
                      alert("Please connect to your wallet before you proceed");
                    }
                  }}
                  className="rounded-md bg-white lg:text-xl text-base lg:px-7 p-2 lg:py-5 lg:mb-0 mb-4 -mt-4 justify-center flex font-medium text-[#00EF8B] shadow-sm hover:bg-[#07a261] hover:text-white">
                  Get started
                  <span className="text[#00EF8B] hover:text-white ml-2 bg-inherit" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>

      </div></footer>
  )
}

export default Footer