"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
    const pathName = usePathname();
    const isActive = pathName === link.url;

    return (
        <Link
            className={`rounded p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                isActive
                    ? "bg-black text-white"
                    : "hover:bg-black/10"
            }`}
            href={link.url}
            aria-current={isActive ? "page" : undefined}
        >
            {link.title}
        </Link>
    );
};

export default NavLink;
