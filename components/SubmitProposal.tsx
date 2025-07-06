import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../public/images/logo.png";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import * as fcl from "@onflow/fcl";

require("dotenv").config();

interface FormData {
  name: string;
  email: string;
  file: File | null;
  description: string;
  message: string;
  website: string;
  socialmedia: string;
  location: string;
  amount: string;
}

const SubmitProposal: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    message: "",
    email: "",
    website: "",
    location: "",
    socialmedia: "",
    amount: "",
    file: null,
  });

  const [passwordError, setPasswordError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "files") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      const fileWithinSizeLimit = file && file.size <= 2 * 1024 * 1024;

      if (fileWithinSizeLimit) {
        setFileError(false);
        setSelectedFile(file);
        setFormData({
          ...formData,
          file: file,
        });
      } else {
        setFileError(true);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setFormData({ ...formData, file: null });
  };

  const signMessage = async (): Promise<string | undefined> => {
    const wallet = await fcl.logIn();
    const MSG = Buffer.from(`Creating Proposal for ${wallet.addr}`).toString(
      "hex"
    );
    try {
      const signatures = await fcl.currentUser.signUserMessage(MSG);
      const signature = signatures[0]; // Extract the first signature from the array
      return signature.signature; // Access the signature property
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Configure AWS SDK credentials
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    // Upload the image to S3
    if (selectedFile) {
      const s3 = new AWS.S3();
      const key = `photos/${selectedFile.name}`; // Set the desired key with a prefix
      const params = {
        Bucket: "flowgrantnew",
        Key: key,
        Body: selectedFile,
        // ACL: 'public-read'
      };

      try {
        await s3.upload(params).promise();
        console.log("Image uploaded successfully.");
      } catch (error) {
        console.error("Error uploading image to S3:", error);
      }
    }

    // Sign the message
    const signature = await signMessage();

    // Prepare the proposal data
    const proposalData = {
      proposalId: 0,
      walletAddress: "string",
      name: formData.name,
      email: formData.email,
      file: "string",
      description: formData.description,
      message: formData.message,
      website: formData.website,
      socialmedia: formData.socialmedia,
      proposalAmount: Number(formData.amount),
      status: "string",
      location: formData.location,
    };

    // Make the API call
    try {
      const response = await fetch("http://16.170.224.207/proposal", {
        method: "POST",
        body: JSON.stringify(proposalData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Signature: signature || "", // Add the signature to the request headers
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // Reset the form
    setFormData({
      name: "",
      description: "",
      message: "",
      email: "",
      website: "",
      location: "",
      socialmedia: "",
      amount: "",
      file: null,
    });

    setPasswordError(false);
    setSelectedFile(null);
  };

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
      <div className="flex items-start flex-col bg-white w-[100%] mt-[68px] -ml-4">
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
          className="w-[100%] lg:flex justify-between px-4 lg:bg-cover   items-center "
          style={{ backgroundImage: `url('/images/dashframe.png')` }}
        >
          <div className="flex flex-col justify-center  h-[64px] ">
            <p className=" lg:text-[24px] text-base text-white -mb-2">
              Welcome, Innovator ✨
            </p>
          </div>
        </div>
        <div className="w-[100%]">
          <div className="flex flex-col lg:mt-[12px] mt-[18px]   gap-y-[12px]">
            <div className="lg:h-[1080px] w-[100%] border-[2px]  lg:px-[30px] lg:py-[20px] justify-between  border-[#00EF8B] p-[8px] ">
              <h1 className="text-[40px] text-center text-[#00EF8B] font-extrabold mb-4">
                Submit proposal
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Project name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project cover description"
                    className="border-b-2 border-gray-300 h-[97px] bg-[#DEE4F0] px-4 py-2 outline-none rounded-md w-full"
                    required
                    maxLength={50}
                  ></textarea>
                </div>
                <div className="mb-6">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border-b-2 border-gray-300 h-[194px] px-4 bg-[#DEE4F0] py-2 outline-none rounded-md w-full"
                    maxLength={2000}
                    placeholder="Project description"
                    required
                  ></textarea>
                </div>
                <div className="mb-6">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Funding amount in $FLOW"
                    className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Project email"
                    className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Project website"
                    className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="socialmedia"
                    name="socialmedia"
                    value={formData.socialmedia}
                    onChange={handleChange}
                    placeholder="Project social media handle"
                    className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Project location"
                    className="border-b-2 border-gray-300 px-4 py-2 outline-none rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="file"
                    className=" text-[#6B717B] text-[12px] mb-1 flex justify-end items-end font-semibold"
                  >
                    Upload supporting document (Max 2MB, Only support .jpg,
                    .jpeg, .png, .pdf)
                  </label>
                  {selectedFile ? (
                    <div className="flex items-center">
                      <span className="mr-2">{selectedFile.name}</span>
                      <button
                        type="button"
                        className="text-red-500 focus:outline-none"
                        onClick={handleDeleteFile}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      id="file"
                      name="files"
                      onChange={handleChange}
                      className="border-b-2 border-gray-300 px-4 py-2 rounded-md w-full"
                      accept=".jpg, .jpeg, .png, .pdf"
                      required
                    />
                  )}
                  {fileError && (
                    <p className="text-red-500 text-sm mt-1">
                      Invalid file or file size exceeded.
                    </p>
                  )}
                </div>

                <div className="flex items-center mt-[50px] mb-[20px] justify-center">
                  <button
                    type="submit"
                    className="bg-[#00EF8B] hover:bg-[#07a261]  text-black text-[15px] lg:text-[25px] font-semibold py-3 px-8 rounded-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitProposal;
