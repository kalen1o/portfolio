"use client";

import Image from "next/image";
import { getImagePath } from "@/utils/imagePath";

const TimelineItem = ({ job, isFirst }) => {
    const isLeft = job.side === "left";

    const dot = (
        <div className="w-1 h-full bg-gray-600 rounded relative">
            <div
                className={`absolute w-5 h-5 rounded-full ring-4 ring-red-400 -left-2 ${
                    isFirst ? "bg-red-400" : "bg-white"
                }`}
            />
        </div>
    );

    const card = (
        <div className="w-full flex flex-col gap-2">
            <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg flex items-center gap-2">
                {job.companyLogo && (
                    <Image
                        src={getImagePath(job.companyLogo)}
                        alt={`${job.company} logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                )}
                <span>
                    {job.role} · {job.company}
                </span>
            </div>
            <div className="p-3 text-sm italic">{job.blurb}</div>
            {job.highlights.length > 0 && (
                <ul className="px-3 list-disc list-inside text-sm text-gray-700 space-y-1">
                    {job.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                    ))}
                </ul>
            )}
            <div className="px-3 text-red-400 text-sm font-semibold">{job.period}</div>
            <div className="px-3 text-xs text-gray-500">{job.location}</div>
        </div>
    );

    return (
        <>
            {/* Mobile: single column with line on the left */}
            <div className="flex md:hidden gap-4 min-h-[12rem] py-2">
                <div className="w-6 flex justify-center shrink-0">{dot}</div>
                <div className="flex-1">{card}</div>
            </div>

            {/* Desktop: zigzag with center line */}
            <div className="hidden md:flex justify-between min-h-[12rem]">
                <div className="w-1/3">{isLeft ? card : null}</div>
                <div className="w-1/6 flex justify-center">{dot}</div>
                <div className="w-1/3">{!isLeft ? card : null}</div>
            </div>
        </>
    );
};

export default TimelineItem;
