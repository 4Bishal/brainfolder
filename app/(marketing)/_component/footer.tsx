"use client"

import Link from "next/link";
import Image from "next/image";
import { pacifico } from "../layout";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo.png"
                                alt="BrainFolder Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className={`${pacifico.className} text-[26px] text-neutral-900 dark:text-neutral-100`}>
                            BrainFolder
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="#"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-neutral-500 dark:text-neutral-500">
                        © {currentYear} <span className={`${pacifico.className}`}>
                            BrainFolder
                        </span>
                        . All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;