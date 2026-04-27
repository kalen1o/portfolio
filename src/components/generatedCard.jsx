"use client";

import Image from "next/image";
import { getImagePath } from "@/utils/imagePath";

const GeneratedCard = ({ project }) => {
    return (
        <div
            className={`w-full h-full bg-gradient-to-br ${project.gradient} rounded-lg flex flex-col items-center justify-center p-8 gap-6`}
        >
            {project.companyLogo && (
                <div className="bg-white/80 rounded-full p-3">
                    <Image
                        src={getImagePath(project.companyLogo)}
                        alt={`${project.company} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>
            )}
            <div className="text-center text-white drop-shadow">
                <div className="text-sm uppercase tracking-wider opacity-90">
                    {project.company}
                </div>
                <div className="text-2xl font-bold mt-1">{project.title}</div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {project.stack.slice(0, 6).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-white/30 text-white rounded backdrop-blur-sm"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default GeneratedCard;
