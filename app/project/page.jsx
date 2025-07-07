"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import user from "../../public/assets/Ellipse2.png";
import upload from "../../public/assets/upload.png";
import Link from "next/link";
import { FiCopy } from "react-icons/fi";
import logo from "../../public/images/logo.png";
import * as fcl from "@onflow/fcl";

const Description = () => {
  const [selectedItems, setSelectedItems] = useState([null, null, null, null]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [formData, setFormData] = useState(null);

  const initialValues = [
    { type: "email", label: "Email", key: "email" },
    { type: "website", label: "Website", key: "website" },
    { type: "phone", label: "Phone Number", key: "phone" },
    { type: "address", label: "Address", key: "address" },
    { type: "social-media", label: "Social Media", key: "GitHub" },
  ];
  const [inputValues, setInputValues] = useState(initialValues);
  const [showNotification, setShowNotification] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleCopyClick = (index) => {
    const valueToCopy = inputValues[index].value;
    navigator.clipboard.writeText(valueToCopy);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleInputChange = (index, value) => {
    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = value;
      return newInputValues;
    });
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

    async function getProposal() {
      const GET_ALL_PROPS = `
            import GrantHub from 0x507dc1ab87c6636f

            access(all) fun main(): [GrantHub.ProposalMeta] {
                return GrantHub.getAllProposalMetas()
            }
            `;
      const response = await fcl.query({
        cadence: GET_ALL_PROPS,
      });

      console.log(response);

      const formattedProjects = response.map((project) => ({
        ...project,
        fundingGoal: Math.floor(project.fundingGoal),
        funded: project.fundingCompleted ? "Funded" : "In Review",
      }));
      setProjects(formattedProjects);
      console.log(formattedProjects);
    }
    getProposal();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (formData) {
      setInputValues((prevInputValues) =>
        prevInputValues.map((input) => {
          const value = formData[input.key];
          return { ...input, value };
        })
      );
    }
  }, [formData]);

  return (
    <>
      <div className="flex items-start flex-col bg-white mt-8  ">
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
        <div
          className="w-[100%] lg:flex justify-between mt-10 px-4 lg:bg-cover hidden  items-center "
          style={{ backgroundImage: `url('/images/dashframe.png')` }}
        >
          <div className="flex flex-col justify-center  h-[86px] ">
            {/* <p className=" text-[24px] text-white text-center -mb-2">Welcome, Innovator ✨</p> */}
          </div>
        </div>
        <div className="w-[100%] lg:py-[54px] lg:px-[80px] py-[20px] px-[12px] flex flex-col">
          <div className="flex flex-col lg:mt-[12px] mt-[18px]   gap-y-[12px]">
            <div className="w-[100%]  ">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-center ">
                    <div className="space-x-6 flex items-center ">
                      <Image
                        src={user}
                        alt=""
                        className="lg:h-[120px] mt-1 h-[50px] w-[50px] lg:w-[120px]"
                      />
                      <div className="flex gap-y-[10px] flex-col">
                        <h3 className="text-[#00EF8B] lg:text-[40px] text-[18px] text-center font-semibold">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                    <p className=" text-black lg:text-[24px] text-[12px] text-center font-semibold ">
                      $FLOW <span>{project.fundingGoal}</span>{" "}
                    </p>
                  </div>
                  <div className="flex justify-between lg:pt-[48px] pt-[16px] gap-y-4">
                    <p className=" text-[#626262] lg:text-[30px] text-[16px] text-center font-semibold ">
                      {project.projectName}
                    </p>
                    <p className=" text-[#626262] lg:text-[30px] text-[14px] text-center font-semibold ">
                      {project.funded}
                    </p>
                  </div>
                  <div className="space-y-[28px] flex flex-col my-[64px] lg:h-[116px] lg:w-[100%]">
                    <p className="text-[#303030] lg:text-2xl text-sm">
                      {project.coverDescription}
                    </p>
                  </div>
                  <div className="lg:pl-[46px] flex lg:flex-row gap-y-6 items-center flex-col mb-[68px] lg:pt-[128px] ">
                    {renderUploadItem(0, "picture1.jpg")}
                    {renderUploadItem(1, "picture2.jpg")}
                    {renderUploadItem(2, "picture3.jpg")}
                    {renderUploadItem(3, "picture4.jpg")}
                  </div>
                  <div className="copy-inputs">
                    {inputValues.map((input, index) => (
                      <div
                        key={index}
                        className="sm-custom:grid sm-custom:grid-cols-2 flex flex-col  sm-custom:mx-[242px] md-custom:mx-[102px] mx-[50px] mb-[31px] "
                      >
                        <label
                          className="flex items-start text-start"
                          htmlFor={`inputField-${index}`}
                        >
                          {input.label}
                        </label>
                        <div className="flex sm-custom:w-[430px] md-custom:w-[302px] w-[300px] justify-between border-2 border-[#00EF8B]">
                          <input
                            id={`inputField-${index}`}
                            type="text"
                            value={input.value}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
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
                  <div className="lg:flex lg:flex-row sm-custom:flex-col flex-col justify-center  items-center ">
                    <p className="lg:text-lg font-normal mb-6 lg:mb-0 text-sm text-[#303030] ">
                      Seize the opportunity to shape the future! FUND projects
                      individually and make a direct impact. Or explore
                      PARTNERSHIP possibilities and collaborate with other
                      like-minded funders to maximize the potential of promising
                      projects.
                    </p>
                    <div className="flex  space-x-[40px] justify-center">
                      <div className="">
                        <Link
                          href={`/proposal?id=${
                            project.id
                          }&name=${encodeURIComponent(
                            project.name
                          )}&projectName=${encodeURIComponent(
                            project.projectName
                          )}&fundingGoal=${
                            project.fundingGoal
                          }&description=${encodeURIComponent(
                            project.coverDescription
                          )}&proposer=${encodeURIComponent(
                            project.proposer
                          )}&status=${encodeURIComponent(project.funded)}`}
                          className="text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] text-[20px] lg:text-[30px]"
                        >
                          Fund
                        </Link>
                      </div>
                      <div className="">
                        <Link
                          href="/dashboard"
                          className="text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] text-[20px] lg:text-[30px]"
                        >
                          Partner
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
