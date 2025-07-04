"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import user from "../../public/assets/Ellipse2.png";
import upload from "../../public/assets/upload.png";
import Link from "next/link";
import { FiCopy } from "react-icons/fi";
import logo from "../../public/images/logo.png";

const Description = () => {
  const [selectedItems, setSelectedItems] = useState([null, null, null, null]);
  const [selectedFunds, setSelectedFunds] = useState([null, null, null]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const initialValues = [
    { type: "email", label: "Email", example: "example@example.com" },
    { type: "website", label: "Website", example: "https://example.com" },
    { type: "phone", label: "Phone Number", example: "+1234567890" },
    { type: "address", label: "Address", example: "123 Street, City" },
    { type: "social-media", label: "Social Media", example: "@example" },
  ];

  const initialFunds = [
    {
      type: "number",
      label: "Funding amount",
      value: "",
      placeholder: "$FLOW 200,000",
    },
    {
      type: "text",
      label: "Funder’s name",
      value: "",
      placeholder: "Abdulsalam Ibrahim",
    },
    {
      type: "email",
      label: "Contact",
      value: "",
      placeholder: "example@example.com",
    },
  ];

  const [inputValues, setInputValues] = useState(initialValues);
  const [inputFunds, setInputFunds] = useState(initialFunds);
  const [showNotification, setShowNotification] = useState(false);

  const handleCopyClick = (index) => {
    const valueToCopy = inputValues[index].example;
    const fundsToCopy = inputFunds[index].value;
    navigator.clipboard.writeText(valueToCopy);
    navigator.clipboard.writeText(fundsToCopy);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleInputChange2 = (index, example) => {
    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = example;
      return newInputValues;
    });
  };

  const handleInputChange = (index, value) => {
    setInputFunds((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index].value = value;
      return newInputValues;
    });
  };

  const handleSubmit = () => {
    // Perform your desired actions with the inputFunds data
    console.log(inputFunds);
    // Reset the form if needed
    setInputFunds(initialFunds);
  };

  const handleFileChange = (index, files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedItems((prevSelectedItems) => {
        const newSelectedItems = [...prevSelectedItems];
        newSelectedItems[index] = file;
        return newSelectedItems;
      });
    }
  };

  const renderUploadItem = (index, pictureUrl) => {
    return (
      <div key={index} className="flex flex-col space-y-2">
        <label htmlFor={`upload-input-${index}`}>
          <Image
            src={upload}
            alt={`Upload Item ${index + 1}`}
            className="lg:w-[119px] w-[50px] cursor-pointer"
          />
        </label>
        <input
          id={`upload-input-${index}`}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(index, e.target.files)}
        />
      </div>
    );
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
    <>
      <div className="flex items-start flex-col bg-white mt-8  ">
        <header className="fixed inset-x-0 mb-4 top-0 sm-custom:z-50">
          <nav
            className={`flex  items-center justify-between p-6  ${
              isScrollingUp ? "bg-white" : "bg-white"
            }`}
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Granthub</span>
                <Image
                  className="flex-shrink-0"
                  src={logo}
                  alt="logo"
                  width={180}
                  height={53}
                />
              </a>
            </div>
          </nav>
        </header>
        <div
          className="w-[100%] lg:flex justify-between px-4 mt-10 lg:bg-contain hidden  items-center "
          style={{ backgroundImage: `url('/images/dashframe.png')` }}
        >
          <div className="flex flex-col justify-center  h-[86px] ">
            {/* <p className=" text-[24px] text-white text-center -mb-2">Welcome, Innovator ✨</p> */}
          </div>
        </div>
        <div className="w-[100%] lg:py-[54px] lg:px-[80px] py-[20px] px-[12px] flex flex-col">
          <div className="flex flex-col lg:mt-[12px] mt-[18px]   gap-y-[12px]">
            <div className="w-[100%]  ">
              <div className="lg:mx-[169px] mt-5 mx-0">
                <div className="lg:h-[252px] lg:w-[776px] sm-custom:w-[450px]   mb-[34px] border-[2px] flex lg:mx-auto md-custom:mx-auto  border-[#00EF8B] p-[8px] ">
                  <div className="flex flex-col  mx-auto">
                    {inputFunds.map((input, index) => (
                      <div
                        key={index}
                        className=" grid grid-cols-2 lg:w-[80%] w-[100%] lg:items-center gap-x-0 items-center space-y-3  "
                      >
                        <label
                          className=" text-[#6B717B] lg:text-2xl text-base lg:ml-7 ml-2 lg:mr-10 mr-2 mt-3 font-semibold text-start"
                          htmlFor={`inputField-${index}`}
                        >
                          {input.label}
                        </label>
                        <div className="flex lg:w-[420px] justify-between  h-[60px]  border-2 border-[#00EF8B]">
                          <input
                            id={`inputField-${index}`}
                            value={input.value}
                            type={input.type}
                            required
                            placeholder={input.placeholder}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            className="w-[100%] mx-2 outline-none"
                          />
                        </div>
                      </div>
                    ))}
                    {showNotification && (
                      <div className=" flex justify-center mx-auto w-[180px] bg-blue-500 text-white px-4 py-2 rounded-md  top-4 right-4">
                        Copied to clipboard!
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:flex justify-center lg:mb-[34px] mb-[18px] items-center  ">
                  <p className="lg:text-lg text-sm  font-normal text-[#303030]  ">
                    Explore{" "}
                    <span className="text-[#00EF8B]"> PARTNERSHIP </span>
                    possibilities and collaborate with other like-minded funders
                    to maximize the potential of promising projects.
                  </p>
                  <div className="flex justify-center lg:mt-0 mt-2 lg:ml-[40px] ml-[10px]">
                    <div className="">
                      <button
                        className="text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] text-[20px] lg:text-[30px]"
                        onClick={handleSubmit}
                      >
                        Fund
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center ">
                <div className="space-x-6 flex items-center ">
                  <Image
                    src={user}
                    alt=""
                    className="lg:h-[120px] mt-1 h-[50px] w-[50px] lg:w-[120px]"
                  />
                  <div className="flex gap-y-[10px] flex-col">
                    <h3 className="text-[#00EF8B] lg:text-[40px] text-[18px] text-center font-semibold">
                      AbdulAzeez Tasleem
                    </h3>
                  </div>
                </div>
                <p className=" text-black lg:text-[24px] text-[12px] text-center font-semibold ">
                  $FLOW 500,000
                </p>
              </div>
              <div className="flex justify-between lg:pt-[48px] pt-[16px] gap-y-4">
                <p className=" text-[#626262] lg:text-[30px] text-[16px] text-center font-semibold ">
                  Blockchain education cohort
                </p>
                <p className=" text-[#626262] lg:text-[30px] text-[14px] text-center font-semibold ">
                  In review
                </p>
              </div>
              <div className="space-y-[28px] flex flex-col my-[64px] lg:h-[116px] lg:w-[100%]">
                <p className="text-[#303030] lg:text-2xl text-sm">
                  Don&apos;t wait any longer. Take the first step towards
                  revolutionizing the blockchain industry by getting started
                  with Flow Grant today. Together, let&apos;s unleash the
                  potential of tomorrow and make your vision a reality.
                </p>
                <p className="text-[#303030] lg:text-2xl text-sm">
                  Don&apos;t wait any longer. Take the first step towards
                  revolutionizing the blockchain industry by getting started
                  with Flow Grant today. Together, let&apos;s unleash the
                  potential of tomorrow and make your vision a reality.
                </p>
                <p className="text-[#303030] lg:text-2xl text-sm">
                  Don&apos;t wait any longer. Take the first step towards
                  revolutionizing the blockchain industry by getting started
                  with Flow Grant today. Together, let&apos;s unleash the
                  potential of tomorrow and make your vision a reality.
                </p>
              </div>
              <div className="lg:pl-[46px] flex lg:flex-row gap-y-6 items-center flex-col mb-[68px] lg:pt-[128px] ">
                {renderUploadItem(0, "picture1.jpg")}
                {renderUploadItem(1, "picture2.jpg")}
                {renderUploadItem(2, "picture3.jpg")}
                {renderUploadItem(3, "picture4.jpg")}
              </div>
              <div className="copy-inputs">
                {inputValues.map((input, index, example) => (
                  <div
                    key={example}
                    className="sm-custom:grid sm-custom:grid-cols-2 flex flex-col lg:grid lg:grid-cols-2 lg:mx-[242px]  sm-custom:mx-[242px] md-custom:mx-[102px] mx-[50px] mb-[31px] "
                  >
                    <label
                      className="flex items-start text-start"
                      htmlFor={`inputField-${example}`}
                    >
                      {input.label}
                    </label>
                    <div className="flex sm-custom:w-[430px] md-custom:w-[302px] w-[300px] justify-between border-2 border-[#00EF8B]">
                      <input
                        id={`inputField-${example}`}
                        type="text"
                        value={input.example}
                        onChange={(e) =>
                          handleInputChange2(index, e.target.example)
                        }
                        readOnly
                        className="w-[100%] mx-2 outline-none"
                      />
                      <button
                        className="mx-2"
                        onClick={() => handleCopyClick(index)}
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>
                ))}
                {showNotification && (
                  <div className=" flex justify-center mx-auto w-[180px] bg-blue-500 text-white px-4 py-2 rounded-md  top-4 right-4">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
