"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import user from "../../public/assets/Ellipse2.png";
import upload from "../../public/assets/upload.png";
import Link from "next/link";
import { FiCopy } from "react-icons/fi";
import logo from "../../public/images/logo.png";
import * as fcl from "@onflow/fcl";
import Notification from "../../components/Notification";

const Description = () => {
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState([null, null, null, null]);
  const [selectedFunds, setSelectedFunds] = useState([null, null, null]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  const [proposalBalance, setProposalBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'success',
    message: ''
  });

  const showNotificationPopup = (type, message) => {
    setNotification({
      isVisible: true,
      type,
      message
    });
  };

  const hideNotificationPopup = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

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

  const handleSubmit = async () => {
    // Perform your desired actions with the inputFunds data
    console.log(inputFunds);
    
    // Validate funding amount
    if (!inputFunds[0].value || parseFloat(inputFunds[0].value) <= 0) {
      showNotificationPopup('error', 'Please enter a valid funding amount');
      return;
    }
    
    const signMessage = async () => {
      const wallet = await fcl.authenticate();
      const MSG = Buffer.from(
        `User: ${wallet.addr} funding proposal with ${JSON.stringify(
          inputFunds
        )}`
      ).toString("hex");
      try {
        const signatures = await fcl.currentUser.signUserMessage(MSG);
        const signature = signatures[0]; // Extract the first signature from the array
        return signature.signature; // Access the signature property
      } catch (error) {
        console.log(error);
        return undefined;
      }
    };

    // Call the Flow mutate function to fund the proposal
    try {
      showNotificationPopup('loading', 'Processing your funding transaction...');
      
      const transactionId = await fcl.mutate({
        cadence: `
          import GrantHub from 0x507dc1ab87c6636f
          import FungibleToken from 0x9a0766d93b6608b7
          import FlowToken from 0x7e60df042a9c0868

          transaction(proposalId: UInt64, amount: UFix64) {
              prepare(acct: auth(Storage) &Account) {
                  let vaultRef = acct.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
                      ?? panic("No FlowToken vault found in storage")
                  let payment <- vaultRef.withdraw(amount: amount)
                  GrantHub.fundProposal(proposalId: proposalId, from: <- payment, funder: acct.address)
              }

              execute {
                  log("Transaction executed successfully")
              }
          }
        `,
        args: (arg, t) => [
          arg(projectData.id, t.UInt64),
          arg(inputFunds[0].value, t.UFix64), 
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 50,
      });
      
      // Hide loading notification
      hideNotificationPopup();
      
      // log the transaction ID
      console.log("Transaction ID:", transactionId);
      // Wait for the transaction to be executed
      const transaction = await fcl.tx(transactionId).onceExecuted();
      console.log(transaction);
      console.log("Proposal funded successfully.");
      
      // Show success notification
      showNotificationPopup('success', `Successfully funded ${inputFunds[0].value} FLOW! 🎉`);
      
      // Refresh the proposal balance after successful funding
      if (projectData?.id) {
        await getProposalBalance(projectData.id);
      }
    } catch (error) {
      // Hide loading notification
      hideNotificationPopup();
      console.log(error);
      showNotificationPopup('error', 'Failed to fund proposal. Please try again.');
    }
    // Reset the form if needed
    if (projectData) {
      setInputFunds([
        {
          type: "number",
          label: "Funding amount",
          value: "",
          placeholder: `$FLOW ${projectData.fundingGoal}`,
        },
        {
          type: "text",
          label: "Funder's name",
          value: "",
          placeholder: "Abdulsalam Ibrahim",
        },
        {
          type: "email",
          label: "Contact",
          value: "",
          placeholder: "example@example.com",
        },
      ]);
    }
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
    // Extract URL parameters
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const projectName = searchParams.get("projectName");
    const fundingGoal = searchParams.get("fundingGoal");
    const description = searchParams.get("description");
    const proposer = searchParams.get("proposer");
    const status = searchParams.get("status");

    if (id) {
      setProjectData({
        id,
        name: name || "Unknown",
        projectName: projectName || "Unknown Project",
        fundingGoal: fundingGoal || "0",
        description:
          description && description !== "undefined"
            ? description
            : "No description available",
        proposer: proposer || "Unknown",
        status: status || "Unknown",
      });
      
      getProposalBalance(id);
    }
    setIsLoading(false);

    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(currentScrollPos < prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchParams]);


  useEffect(() => {
    if (projectData) {
      setInputFunds([
        {
          type: "number",
          label: "Funding amount",
          value: "",
          placeholder: `$FLOW ${projectData.fundingGoal}`,
        },
        {
          type: "text",
          label: "Funder's name",
          value: "",
          placeholder: "Abdulsalam Ibrahim",
        },
        {
          type: "email",
          label: "Contact",
          value: "",
          placeholder: "example@example.com",
        },
      ]);
    }
  }, [projectData]);

  // Function to get proposal balance
  const getProposalBalance = async (proposalId) => {
    if (!proposalId) return;

    setIsLoadingBalance(true);
    try {
      const GET_PROPOSAL_BALANCE = `
        import GrantHub from 0x507dc1ab87c6636f

        access(all) fun main(proposalId: UInt64): UFix64 {
            return GrantHub.getProposalBalance(proposalId: proposalId)
        }
      `;

      const balance = await fcl.query({
        cadence: GET_PROPOSAL_BALANCE,
        args: (arg, t) => [arg(proposalId, t.UInt64)],
      });


      const flowBalance = parseFloat(balance);
      setProposalBalance(flowBalance);
      console.log(`Proposal ${proposalId} balance:`, flowBalance, "FLOW");
    } catch (error) {
      console.error("Error fetching proposal balance:", error);
      setProposalBalance(0);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00EF8B]"></div>
          <p className="mt-4 text-xl">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-500">No project data found</p>
          <Link href="/" className="text-[#00EF8B] underline mt-4 block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotificationPopup}
        duration={4000}
      />
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
                      {projectData?.name || "Loading..."}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className=" text-black lg:text-[24px] text-[12px] text-center font-semibold ">
                    Goal: $FLOW {projectData?.fundingGoal || "0"}
                  </p>
                  <p className=" text-[#00EF8B] lg:text-[20px] text-[10px] text-center font-semibold ">
                    {isLoadingBalance ? "Loading..." : `Raised: $FLOW ${proposalBalance.toFixed(2)}`}
                  </p>
                  {projectData?.fundingGoal && proposalBalance > 0 && (
                    <div className="w-full mt-2">
                      <div className="bg-gray-200 rounded-full h-2 lg:w-[200px] w-[120px]">
                        <div 
                          className="bg-[#00EF8B] h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((proposalBalance / parseFloat(projectData.fundingGoal)) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {((proposalBalance / parseFloat(projectData.fundingGoal)) * 100).toFixed(1)}% funded
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between lg:pt-[48px] pt-[16px] gap-y-4">
                <p className=" text-[#626262] lg:text-[30px] text-[16px] text-center font-semibold ">
                  {projectData?.projectName || "Loading..."}
                </p>
                <p className=" text-[#626262] lg:text-[30px] text-[14px] text-center font-semibold ">
                  {projectData?.status || "Loading..."}
                </p>
              </div>
              <div className="space-y-[28px] flex flex-col my-[64px] lg:h-[116px] lg:w-[100%]">
                <p className="text-[#303030] lg:text-2xl text-sm">
                  {projectData?.description || "Loading project description..."}
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
