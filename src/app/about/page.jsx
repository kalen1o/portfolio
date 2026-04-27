"use client";
import Brain from "@/components/brain";
import SkillGroup from "@/components/skillGroup";
import TimelineItem from "@/components/timelineItem";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { jobs } from "@/data/jobs";

const AboutPage = () => {
    const containerRef = useRef();
    const { scrollYProgress } = useScroll({ container: containerRef });

    const skillRef = useRef();
    const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

    const experienceRef = useRef();
    const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

    const ChevronDown = () => (
        <motion.svg
            initial={{ opacity: 0.2, y: 0 }}
            animate={{ opacity: 1, y: "10px" }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
        >
            <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
            ></path>
            <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
            <path d="M15 11L12 14L9 11" stroke="#000000" strokeWidth="1"></path>
        </motion.svg>
    );

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
                {/* TEXT CONTAINER */}
                <div className="p-4 sm:p-8 md:p-12 lg:p-20 flex flex-col gap-24 md:gap-32 lg:gap-48 lg:w-2/3 lg:pr-0">
                    {/* BIOGRAPHY CONTAINER */}
                    <div className="flex flex-col gap-12 justify-center">
                        <h1 className="font-bold text-2xl">BIOGRAPHY</h1>
                        {profile.bio.map((paragraph, i) => (
                            <p key={i} className="text-lg">{paragraph}</p>
                        ))}
                        <span className="italic">{profile.bioQuote}</span>
                        <ChevronDown />
                    </div>

                    {/* SKILLS CONTAINER */}
                    <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
                        <motion.h1
                            initial={{ x: "-300px" }}
                            animate={isSkillRefInView ? { x: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="font-bold text-2xl"
                        >
                            SKILLS
                        </motion.h1>
                        <motion.div
                            initial={{ x: "-300px" }}
                            animate={isSkillRefInView ? { x: 0 } : {}}
                            className="flex flex-col gap-8"
                        >
                            {skillGroups.map((g) => (
                                <SkillGroup key={g.group} group={g.group} items={g.items} />
                            ))}
                        </motion.div>
                        <ChevronDown />
                    </div>

                    {/* EXPERIENCE CONTAINER */}
                    <div className="flex flex-col gap-12 justify-center pb-48" ref={experienceRef}>
                        <motion.h1
                            initial={{ x: "-300px" }}
                            animate={isExperienceRefInView ? { x: "0" } : {}}
                            transition={{ delay: 0.2 }}
                            className="font-bold text-2xl"
                        >
                            EXPERIENCE
                        </motion.h1>
                        <motion.div
                            initial={{ x: "-300px" }}
                            animate={isExperienceRefInView ? { x: "0" } : {}}
                        >
                            {jobs.map((job, i) => (
                                <TimelineItem key={job.id} job={job} isFirst={i === 0} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* SVG CONTAINER */}
                <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
                    <Brain scrollYProgress={scrollYProgress} />
                </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;
