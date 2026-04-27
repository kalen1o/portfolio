"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLink from "./navLink";
import { motion } from "framer-motion";
import { getImagePath } from "@/utils/imagePath";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Close mobile menu on Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const links = [
        { title: "Home", url: "/" },
        { title: "About", url: "/about" },
        { title: "Portfolio", url: "/portfolio" },
        { title: "Contact", url: "/contact" },
    ];

    const topVariants = {
        closed: { rotate: 0 },
        opened: { rotate: 45, backgroundColor: "rgb(255,255,255)" },
    };
    const centerVariants = {
        closed: { opacity: 1 },
        opened: { opacity: 0 },
    };
    const bottomVariants = {
        closed: { rotate: 0 },
        opened: { rotate: -45, backgroundColor: "rgb(255,255,255)" },
    };

    const listVariants = {
        closed: { x: "100vw" },
        opened: {
            x: 0,
            transition: { when: "beforeChildren", staggerChildren: 0.2 },
        },
    };

    const listItemVariants = {
        closed: { x: -10, opacity: 0 },
        opened: { x: 0, opacity: 1 },
    };

    const focusRing =
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded";

    return (
        <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
            {/* LINKS */}
            <div className="hidden md:flex gap-4 w-1/3">
                {links.map((link) => (
                    <NavLink link={link} key={link.title} />
                ))}
            </div>

            {/* SOCIAL */}
            <div className="hidden md:flex gap-4 items-center">
                <Link
                    href="https://github.com/kalen1o"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className={focusRing}
                >
                    <Image src={getImagePath("/github.png")} alt="GitHub" width={24} height={24} />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/kalen1o/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className={focusRing}
                >
                    <Image src={getImagePath("/linkedin.png")} alt="LinkedIn" width={24} height={24} />
                </Link>
                <a
                    href="mailto:trantienquang101198@gmail.com"
                    aria-label="Email"
                    className={`w-6 h-6 flex items-center justify-center ${focusRing}`}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 5L2 7" />
                    </svg>
                </a>
            </div>
            {/* RESPONSIVE MENU */}
            <div className="md:hidden">
                {/* MENU BUTTON */}
                <button
                    type="button"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((prev) => !prev)}
                    className={`w-12 h-12 flex flex-col justify-center items-center gap-[6px] z-50 relative ${focusRing}`}
                >
                    <motion.div
                        variants={topVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-8 h-1 bg-black rounded origin-center"
                    />
                    <motion.div
                        variants={centerVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-8 h-1 bg-black rounded"
                    />
                    <motion.div
                        variants={bottomVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-8 h-1 bg-black rounded origin-center"
                    />
                </button>
                {/* MENU LIST */}
                {open && (
                    <motion.div
                        id="mobile-menu"
                        variants={listVariants}
                        initial="closed"
                        animate="opened"
                        className="absolute top-0 left-0 w-screen min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
                    >
                        {links.map((link) => (
                            <motion.div
                                variants={listItemVariants}
                                key={link.title}
                            >
                                <Link
                                    href={link.url}
                                    onClick={() => setOpen(false)}
                                    className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded p-2`}
                                >
                                    {link.title}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
