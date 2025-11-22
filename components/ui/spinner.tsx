"use client";

type Size = "sm" | "md" | "lg";

const SIZE_MAP: Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
};

export default function Spinner({ size = "md" }: { size?: Size }) {
    const sizeClass = SIZE_MAP[size];

    return (
        <div
            className={`grid rounded-full ${sizeClass}`}
            aria-hidden="true"
            style={{
                aspectRatio: "1",
                background: `
          linear-gradient(0deg, rgb(0 0 0/50%) 30%, transparent 0 70%, rgb(0 0 0/100%) 0) 50%/8% 100%,
          linear-gradient(90deg, rgb(0 0 0/25%) 30%, transparent 0 70%, rgb(0 0 0/75%) 0) 50%/100% 8%
        `,
                backgroundRepeat: "no-repeat",
                animation: "spin 1s infinite steps(12)",
            }}
        >
            <div
                style={{
                    gridArea: "1/1",
                    borderRadius: "50%",
                    background: `
            linear-gradient(0deg, rgb(0 0 0/50%) 30%, transparent 0 70%, rgb(0 0 0/100%) 0) 50%/8% 100%,
            linear-gradient(90deg, rgb(0 0 0/25%) 30%, transparent 0 70%, rgb(0 0 0/75%) 0) 50%/100% 8%
          `,
                    backgroundRepeat: "no-repeat",
                    opacity: 0.915,
                    transform: "rotate(30deg)",
                }}
            />
            <div
                style={{
                    gridArea: "1/1",
                    borderRadius: "50%",
                    background: `
            linear-gradient(0deg, rgb(0 0 0/50%) 30%, transparent 0 70%, rgb(0 0 0/100%) 0) 50%/8% 100%,
            linear-gradient(90deg, rgb(0 0 0/25%) 30%, transparent 0 70%, rgb(0 0 0/75%) 0) 50%/100% 8%
          `,
                    backgroundRepeat: "no-repeat",
                    opacity: 0.83,
                    transform: "rotate(60deg)",
                }}
            />
        </div>
    );
}
