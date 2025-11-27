"use client";

import { useEffect, useState } from "react";

type Size = "sm" | "md" | "lg";

const SIZE_MAP: Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
};

export default function Spinner({ size = "md" }: { size?: Size }) {
    const [isDark, setIsDark] = useState(false);
    const sizeClass = SIZE_MAP[size];

    useEffect(() => {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.classList.contains("dark");
        setIsDark(currentTheme);

        const observer = new MutationObserver(() => {
            const newTheme = htmlElement.classList.contains("dark");
            setIsDark(newTheme);
        });

        observer.observe(htmlElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // Theme-aware color values
    const colors = isDark
        ? {
            opaque: "rgb(255 255 255/100%)",
            strong: "rgb(255 255 255/75%)",
            medium: "rgb(255 255 255/50%)",
            light: "rgb(255 255 255/25%)",
        }
        : {
            opaque: "rgb(0 0 0/100%)",
            strong: "rgb(0 0 0/75%)",
            medium: "rgb(0 0 0/50%)",
            light: "rgb(0 0 0/25%)",
        };

    const backgroundImage = `
    linear-gradient(0deg, ${colors.medium} 30%, transparent 0 70%, ${colors.opaque} 0),
    linear-gradient(90deg, ${colors.light} 30%, transparent 0 70%, ${colors.strong} 0)
  `;

    return (
        <div
            className={`grid rounded-full ${sizeClass}`}
            aria-hidden="true"
            style={{
                aspectRatio: "1",
                backgroundImage: backgroundImage,
                backgroundSize: "8% 100%, 100% 8%",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                animation: "spin 1s infinite steps(12)",
            }}
        >
            <div
                style={{
                    gridArea: "1/1",
                    borderRadius: "50%",
                    backgroundImage: backgroundImage,
                    backgroundSize: "8% 100%, 100% 8%",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.915,
                    transform: "rotate(30deg)",
                }}
            />
            <div
                style={{
                    gridArea: "1/1",
                    borderRadius: "50%",
                    backgroundImage: backgroundImage,
                    backgroundSize: "8% 100%, 100% 8%",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.83,
                    transform: "rotate(60deg)",
                }}
            />
        </div>
    );
}