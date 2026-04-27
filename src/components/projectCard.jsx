"use client";

import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/utils/imagePath";
import GeneratedCard from "./generatedCard";

const ProjectCard = ({ project }) => {
    const hasScreenshot = Boolean(project.image);

    return (
        <div
            className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r ${project.gradient}`}
        >
            <div className="flex flex-col gap-6 text-white max-w-5xl px-8 lg:px-16">
                {/* HEADER: company + period */}
                <div className="flex items-center gap-3 text-sm uppercase tracking-wider opacity-90">
                    {project.companyLogo && (
                        <Image
                            src={getImagePath(project.companyLogo)}
                            alt=""
                            width={24}
                            height={24}
                            className="object-contain bg-white/80 rounded p-0.5"
                        />
                    )}
                    <span>{project.company}</span>
                    <span>·</span>
                    <span>{project.period}</span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                    {project.title}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* IMAGE / GENERATED CARD */}
                    <div className="relative w-full lg:w-1/2 h-56 md:h-64 lg:h-80">
                        {hasScreenshot ? (
                            <Image
                                src={getImagePath(project.image)}
                                alt={project.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        ) : (
                            <GeneratedCard project={project} />
                        )}
                    </div>

                    {/* TEXT */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <p className="text-base lg:text-lg">{project.summary}</p>
                        <ul className="list-disc list-inside text-sm lg:text-base space-y-1">
                            {project.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* STACK */}
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-white/30 text-white rounded backdrop-blur-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* LINK */}
                {project.links?.live && (
                    <div className="flex justify-end">
                        <Link href={project.links.live} target="_blank" rel="noreferrer">
                            <button className="p-3 lg:p-4 bg-white text-gray-700 font-semibold rounded">
                                See Live →
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
