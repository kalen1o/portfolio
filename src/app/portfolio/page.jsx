"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import ProjectCard from "@/components/projectCard";
import { projects } from "@/data/projects";

const PortfolioPage = () => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({ target: ref });
    // Container is h-[800vh]: 1vh hero + ~7vh of carousel scroll.
    // Skip the hero portion (first 1/8 of progress) so the carousel
    // doesn't start translating until the hero scrolls past.
    // Translate from 0% to -85.71% (= 6/7) so the 7th card lands flush.
    const x = useTransform(scrollYProgress, [0.125, 1], ["0%", "-85.71%"]);

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-[800vh] relative" ref={ref}>
                <div className="w-screen h-[calc(100dvh-6rem)] flex items-center justify-center text-5xl md:text-7xl lg:text-8xl text-center px-4">
                    My Works
                </div>
                <div className="sticky top-0 flex h-[100dvh] gap-4 items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                </div>
            </div>
            <div className="w-screen min-h-[100dvh] flex flex-col gap-12 md:gap-16 items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Do you have a project?</h1>
                <div className="relative">
                    <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        viewBox="0 0 300 300"
                        className="w-64 h-64 md:w-[500px] md:h-[500px]"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                            />
                        </defs>
                        <text fill="#000">
                            <textPath xlinkHref="#circlePath" className="text-xl">
                                Full-Stack Engineer · Java · Spring Boot · React
                            </textPath>
                        </text>
                    </motion.svg>
                    <Link
                        href="/contact"
                        className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Hire Me
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioPage;
