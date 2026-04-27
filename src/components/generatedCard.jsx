"use client";

import Image from "next/image";
import { getImagePath } from "@/utils/imagePath";

const GeneratedCard = ({ project }) => {
    return (
        <div className="w-full h-full bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center justify-center p-8 gap-5">
            {project.companyLogo && (
                <div className="rounded-full p-2 bg-gray-50 border border-gray-100">
                    <Image
                        src={getImagePath(project.companyLogo)}
                        alt={`${project.company} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>
            )}
            <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    {project.company}
                </div>
                <div className="text-xl font-bold mt-1 text-gray-900">{project.title}</div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center max-w-md">
                {project.stack.slice(0, 6).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default GeneratedCard;
