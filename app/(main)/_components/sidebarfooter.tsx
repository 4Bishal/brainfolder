"use client"

import { Home, Moon, Sun, Github, Linkedin, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const SidebarFooter = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const handleHomeClick = () => {
        router.push('/documents');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const year = new Date().getFullYear();


    return (
        <div className="mt-auto border-t">
            {/* Top Row: Theme Toggle and Home Button */}
            <div className="flex items-center justify-between gap-2 p-3">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="relative h-9 w-[70px] rounded-full bg-secondary flex-shrink-0 border border-border shadow-sm overflow-hidden"
                >
                    {/* Sliding Circle with Icon */}
                    <div
                        className={`absolute top-1 h-7 w-7 rounded-full bg-background border border-border shadow-md transition-all duration-300 ease-in-out flex items-center justify-center ${theme === 'dark' ? 'translate-x-[38px]' : 'translate-x-1'
                            }`}
                    >
                        {theme === 'dark' ? (
                            <Moon size={14} className="text-foreground" />
                        ) : (
                            <Sun size={14} className="text-foreground" />
                        )}
                    </div>

                    {/* Background Icons */}
                    <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                        <Sun size={14} className={`transition-opacity ${theme === 'light' ? 'opacity-0' : 'opacity-40'}`} />
                        <Moon size={14} className={`transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-40'}`} />
                    </div>
                </button>

                {/* Home Button */}
                <button
                    onClick={handleHomeClick}
                    className="h-8 px-4 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors cursor-pointer"
                >
                    <Home size={16} />
                </button>
            </div>

            {/* Bottom Row: Social Links and Copyright */}
            <div className="px-3 pb-3 space-y-2">
                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                    <a
                        href="https://github.com/4Bishal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github size={16} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/bishal-bhandari-a63b8926a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Linkedin size={16} />
                    </a>
                    <a
                        href="https://www.instagram.com/bishalbhandari949/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Instagram size={16} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-[10px] text-muted-foreground text-center">
                    © {year} All rights reserved
                </p>
            </div>
        </div>
    );
};