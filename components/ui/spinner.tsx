type Size = "sm" | "md" | "lg" | number; // number = custom pixel size

interface SpinnerProps {
    size?: Size;
    className?: string; // allow override anywhere
}

export default function Spinner({ size = "sm", className = "" }: SpinnerProps) {
    // If user provides a number, treat it as pixel size
    const computedSize =
        typeof size === "number"
            ? `h-[${size}px] w-[${size}px] border-[${Math.max(
                size * 0.12,
                2.5
            )}px]`
            : {
                sm: "h-4 w-4 border-[2.5px]",
                md: "h-5 w-5 border-[3px]",
                lg: "h-7 w-7 border-[3px]",
            }[size];

    return (
        <div
            className={`animate-spin rounded-full border-neutral-300 border-t-black/80 ${computedSize} ${className}`}
            aria-hidden
        />
    );
}
