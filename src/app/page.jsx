"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePath } from "@/utils/imagePath";
import { useRouter } from "next/navigation";
import { profile } from "@/data/profile";

const Homepage = () => {
    const router = useRouter();

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
                {/* IMAGE CONTAINER */}
                <div className="h-1/2 lg:h-full lg:w-1/2 relative">
                    <Image src={getImagePath("/hero.png")} alt="" fill className="object-contain" />
                </div>
                {/* TEXT CONTAINER */}
                <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-6 items-start justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold">{profile.name}</h1>
                    <h2 className="text-lg md:text-2xl text-gray-700">{profile.title}</h2>
                    <p className="md:text-lg">{profile.hero.summary}</p>
                    <p className="md:text-base italic text-gray-600">{profile.hero.origin}</p>
                    <div className="w-full flex flex-wrap gap-3">
                        <button
                            onClick={() => router.push("/portfolio")}
                            className="p-4 rounded-lg ring-1 ring-black bg-black text-white"
                        >
                            View My Work
                        </button>
                        <button
                            onClick={() => router.push("/contact")}
                            className="p-4 rounded-lg ring-1 ring-black"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Homepage;
