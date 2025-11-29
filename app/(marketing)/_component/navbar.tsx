"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Spinner from "@/components/ui/spinner";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { Menu, X } from "lucide-react";
import { pacifico } from "../layout";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Theme-aware logo with drop shadow for desktop */}
                        <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
                            {mounted && (
                                <Image
                                    src="/logo.png"
                                    alt="BrainFolder Logo"
                                    fill
                                    className="object-contain md:dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                                    priority
                                />
                            )}
                        </div>
                        <span className={`${pacifico.className} text-[26px] text-neutral-900 dark:text-neutral-100`}>
                            BrainFolder
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {isLoading && (
                            <div className="w-6 h-6">
                                <Spinner size="sm" />
                            </div>
                        )}

                        {!isAuthenticated && !isLoading && (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Login
                                    </Button>
                                </SignInButton>
                                <SignInButton mode="modal">
                                    <Button size="sm" className="font-semibold">
                                        Get Started Free
                                    </Button>
                                </SignInButton>
                            </>
                        )}

                        {isAuthenticated && !isLoading && (
                            <>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/documents">Enter BrainFolder</Link>
                                </Button>
                                <UserButton afterSignOutUrl="/" />
                            </>
                        )}

                        <ModeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-3">
                        <ModeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-neutral-700 dark:text-neutral-300"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="px-4 py-6 space-y-4">
                        {isLoading && (
                            <div className="flex justify-center">
                                <Spinner size="sm" />
                            </div>
                        )}

                        {!isAuthenticated && !isLoading && (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        Login
                                    </Button>
                                </SignInButton>
                                <SignInButton mode="modal">
                                    <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        Get Started Free
                                    </Button>
                                </SignInButton>
                            </>
                        )}

                        {isAuthenticated && !isLoading && (
                            <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                <Link href="/documents">Enter BrainFolder</Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;