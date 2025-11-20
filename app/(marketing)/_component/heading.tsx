"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
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
                <Button>
                    Enter BrainFolder
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
        </div>
    );
};

export default Heading;
