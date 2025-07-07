import Image from "next/image";
import React, { useState, useEffect } from "react";
import user from "../../public/assets/Ellipse2.png";
import Link from "next/link";
import logo from "../../public/images/logo.png";
import * as fcl from "@onflow/fcl";
import { get } from "http";

interface Project {
  id: number;
  name: string;
  projectName: string;
  coverDescription: string;
  fundingGoal: number;
  fundingCompleted: boolean;
  funded: string;
}

const Project: React.FC = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(currentScrollPos < prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    async function getProposal() {
      const GET_ALL_PROPS = `
            import GrantHub from 0xb9b9e5ad5de42ef6

            access(all) fun main(): [GrantHub.ProposalMeta] {
                return GrantHub.getAllProposalMetas()
            }
            `;
      const response = await fcl.query({
        cadence: GET_ALL_PROPS,
      });

      console.log(response);

      const formattedProjects: Project[] = response.map((project: Project) => ({
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

  return (
    <>
      <div className="flex items-start flex-col w-[99%] mt-[68px] -ml-4">
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
          className="w-[100%] lg:flex justify-between px-4 lg:bg-cover   items-center"
          style={{ backgroundImage: `url('/images/dashframe.png')` }}
        >
          <div className="flex flex-col justify-center  h-[64px] ">
            <p className=" lg:text-[24px] text-base text-white -mb-2">
              Welcome, Innovator ✨
            </p>
          </div>
        </div>
        <div className="w-[100%]  flex flex-col">
          <div className="flex flex-col lg:mt-[12px] mt-[18px] bg-[#BCD7CB]   gap-y-[12px]">
            <div className="lg:h-[100%] w-[100%]  justify-between overflow-y-auto ">
              <div className="lg:h-[100%] w-[100%] border-[2px]  lg:px-[30px] lg:py-[20px] justify-between  border-[#00EF8B] p-[8px] ">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between">
                      <div className="space-x-6 flex items-center">
                        <Image
                          src={user}
                          alt=""
                          className="lg:h-[120px] mt-1 h-[50px] w-[50px] lg:w-[120px]"
                        />
                        <div className="flex gap-y-[10px] flex-col">
                          <h3 className="text-[#FFFFFF] lg:text-[40px] text-[18px] font-semibold">
                            {project.name}
                          </h3>
                          <p className=" text-[#626262] lg:text-[30px] text-[16px] text-center font-semibold ">
                            {project.projectName}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col lg:pt-[18px] pt-[6px] gap-y-4">
                        <p className=" text-black lg:text-[24px] text-[12px] text-center font-semibold ">
                          $FLOW <span>{project.fundingGoal}</span>{" "}
                        </p>
                        <p className=" text-[#626262] lg:text-[30px] text-[14px] text-center font-semibold ">
                          {project.funded}
                        </p>
                      </div>
                    </div>
                    <div className="my-[43px] lg:h-[116px] lg:w-[915px]">
                      <p className="text-[#303030] lg:text-2xl text-sm">
                        {project.coverDescription}
                      </p>
                    </div>
                    <div className="flex justify-end  items-end">
                      <Link href="/project" legacyBehavior passHref>
                        <a className="text-center text-black font-semibold lg:py-[10px] cursor-pointer p-2 lg:px-[30px] bg-[#00EF8B] text-[20px] lg:text-[30px]">
                          View
                        </a>
                      </Link>
                    </div>
                    {/* <div className="lg:w-[110%] w-[115%]   -ml-10 -mr-0 my-4  bg-white h-[30px]"></div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
