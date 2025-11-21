"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your ideas, tasks, and notes. <br /> Welcome to{" "}
                <span className="underline underline-offset-4 decoration-primary">
                    BrainFolder
                </span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                A simple, connected workspace for everything you think. <br /> Notes,
                tasks, ideas — all in one place.
            </h3>
            <Link href="/documents">

                <div className="justify-center mt-4 w-full flex items-center ">
                    {/* Loading placeholder area -- prevents layout shift */}
                    <div className="w-6 h-6 flex items-center justify-center">
                        {isLoading && <Spinner size="sm" />}
                    </div>

                    {/* Unauthenticated */}
                    {!isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode="modal">
                                <Button size="sm" className="cursor-pointer">
                                    Get BrainFolder free
                                </Button>
                            </SignInButton>
                        </>
                    )}

                    {/* Authenticated */}
                    {isAuthenticated && !isLoading && (
                        <>
                            <Button size="sm" className="cursor-pointer" asChild>
                                <Link href="/documents">
                                    Enter BrainFolder
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default Heading;
<ArrowRight className="h-4 w-4 ml-2" />