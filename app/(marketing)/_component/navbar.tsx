"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Spinner from "@/components/ui/spinner";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();



    return (
        <div
            className={cn(
                "z-50 bg-background fixed top-0 flex items-center w-full p-6",
                scrolled && "border-b shadow-sm"
            )}
        >
            {/* Logo - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
                <span className="font-mono text-lg font-semibold">BrainFolder</span>
            </div>

            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-3">
                {/* Loading placeholder area -- prevents layout shift */}
                <div className="w-6 h-6 flex items-center justify-center">
                    {isLoading && <Spinner size="sm" />}
                </div>

                {/* Unauthenticated */}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm" className="cursor-pointer">
                                Login
                            </Button>
                        </SignInButton>

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
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter BrainFolder</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}

                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;