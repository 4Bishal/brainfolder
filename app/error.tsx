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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 px-6">
            {/* Floating Card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-6 max-w-lg animate-fadeIn">
                {/* Playful Icon */}
                <div className="relative">
                    <AlertCircle className="w-20 h-20 text-red-500 animate-bounce" />
                    <span className="absolute -top-4 -right-4 text-2xl animate-ping text-yellow-400">💥</span>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Uh-oh! Something broke</h1>
                <div className="flex gap-4 mt-6">
                    <Button onClick={() => router.push("/documents")} variant="default">
                        🏠 Go Home
                    </Button>
                    {reset && (
                        <Button onClick={reset} variant="outline">
                            🔄 Try Again
                        </Button>
                    )}
                </div>
            </div>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 animate-fadeIn">
                © {new Date().getFullYear()} BrainFolder. All rights reserved.
            </p>

            <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
