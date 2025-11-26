"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileMinus } from "lucide-react";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-6">
            {/* Floating Card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-6 max-w-lg animate-fadeIn">
                {/* Illustration */}
                <div className="relative">
                    <FileMinus className="w-20 h-20 text-indigo-500 animate-bounce" />
                    <span className="absolute -top-4 -right-4 text-2xl animate-ping text-yellow-400">⚠️</span>
                </div>

                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
                    Page Not Found
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-center">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>

                <Button
                    onClick={() => router.push("/")}
                    variant="default"
                    className="mt-4"
                >
                    🏠 Go Back Home
                </Button>
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
