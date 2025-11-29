"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { pacifico } from "../layout";

const CTASection = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-4xl mx-auto text-center space-y-8 ">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
                    Ready to get organized?
                </h2>
                <p className="text-lg text-neutral-900 dark:text-neutral-100 max-w-2xl mx-auto">
                    Join thousands of users who trust
                    {' '}<span className={`${pacifico.className}`}>
                        BrainFolder
                    </span>{' '}

                    to keep their ideas organized and accessible.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {isLoading && (
                        <div className="w-6 h-6">
                            <Spinner size="sm" />
                        </div>
                    )}

                    {!isAuthenticated && !isLoading && (
                        <SignInButton mode="modal">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                Start For Free
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </SignInButton>
                    )}

                    {isAuthenticated && !isLoading && (
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                            asChild
                        >
                            <Link href="/documents">
                                Open BrainFolder
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Link>
                        </Button>
                    )}
                </div>

                {!isAuthenticated && !isLoading && (
                    <p className="text-sm text-neutral-400">
                        No credit card required • Free forever
                    </p>
                )}
            </div>
        </section>
    );
};

export default CTASection;