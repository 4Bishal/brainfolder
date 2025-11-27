"use client"

import { useTheme } from "next-themes"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

interface IconPickerProps {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
    disabled?: boolean;  // archived mode
}

export const IconPicker = ({
    onChange,
    children,
    asChild,
    disabled
}: IconPickerProps) => {

    const { resolvedTheme } = useTheme();

    const themeMap = {
        dark: Theme.DARK,
        light: Theme.LIGHT,
    };

    const theme = themeMap[(resolvedTheme || "light") as keyof typeof themeMap];

    return (
        <Popover>
            <PopoverTrigger
                asChild={asChild}
                onClick={(e) => {
                    if (disabled) {
                        // Stop popover from opening
                        e.preventDefault();
                        e.stopPropagation();

                        // Show message
                        toast.warning("Restore page to do this action");
                    }
                }}
            >
                {children}
            </PopoverTrigger>

            {/* Only render emoji picker when NOT disabled */}
            {!disabled && (
                <PopoverContent className="p-0 w-full border-none shadow-none">
                    <EmojiPicker
                        height={350}
                        theme={theme}
                        onEmojiClick={(data) => onChange(data.emoji)}
                    />
                </PopoverContent>
            )}
        </Popover>
    );
};
