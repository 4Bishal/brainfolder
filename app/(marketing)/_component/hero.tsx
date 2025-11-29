"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Shield, Cloud, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { pacifico } from "../layout";

const Hero = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-200 dark:bg-neutral-800 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-300 dark:bg-neutral-700 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    {/* Badge with Logo */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm">
                        <div className="relative w-5 h-5">
                            {mounted && (
                                <Image
                                    src="/logo.png"
                                    alt="BrainFolder"
                                    fill
                                    className="object-contain dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                                />
                            )}
                        </div>
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Your Connected Workspace
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                            <span className="text-neutral-900 dark:text-neutral-100">
                                Organize Your Ideas with
                            </span>
                            <br />
                            <span className="relative inline-flex items-center justify-center gap-3 mt-4">
                                {/* Brand Name */}
                                <span className={`${pacifico.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 dark:text-neutral-100`}>
                                    BrainFolder
                                </span>

                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            A unified workspace where your notes, tasks, and ideas come together.
                            Simple, powerful, and designed for clarity.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        {isLoading && (
                            <div className="w-6 h-6">
                                <Spinner size="sm" />
                            </div>
                        )}

                        {!isAuthenticated && !isLoading && (
                            <>
                                <SignInButton mode="modal">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Get Started Free
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </SignInButton>
                                <p className="text-sm text-neutral-500 dark:text-neutral-500 sm:hidden">
                                    No credit card required
                                </p>
                            </>
                        )}

                        {isAuthenticated && !isLoading && (
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                                asChild
                            >
                                <Link href="/documents">
                                    Open  BrainFolder
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Trust Indicators */}
                    {!isAuthenticated && !isLoading && (
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span>Encrypted & Private</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Cloud className="w-4 h-4" />
                                <span>Sync Across Devices</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>Unlimited Notes</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;