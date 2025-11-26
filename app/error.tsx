"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
    error?: Error;
    reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const router = useRouter();

    useEffect(() => {
        if (error) console.error("Error caught:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-6 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl flex flex-col items-center gap-6 max-w-md">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Oops! Something went wrong</h1>
                <div className="flex gap-4 mt-4">
                    <Button onClick={() => router.push("/documents")} variant="default">
                        Go Home
                    </Button>
                    {reset && (
                        <Button onClick={reset} variant="outline">
                            Try Again
                        </Button>
                    )}
                </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} BrainFolder. All rights reserved.
            </p>
        </div>
    );
}
