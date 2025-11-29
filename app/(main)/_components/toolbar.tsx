"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutoSize from "react-textarea-autosize"
import { useCoverImage } from "@/hooks/user-coverimage";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ToolbarProps {
    initialData: Doc<"documents">
    preview?: boolean
}

const Toolbar = (
    { initialData, preview }: ToolbarProps
) => {

    const params = useParams();

    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [value, setValue] = useState(initialData.title);
    const [isEditing, setIsEditing] = useState(false);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon)

    const coverImage = useCoverImage();
    const isMobile = useMediaQuery("(max-width:768px)");

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    })

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0)
    }

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled"
        });
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    }

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        })
    };

    const onIconRemove = () => {
        removeIcon({
            id: initialData._id
        })
    }

    return (
        <div className="pl-4 pr-1 sm:pl-[54px] sm:pr-0 group relative max-w-full overflow-x-hidden">
            {!!initialData.icon && !preview &&
                (
                    <div className="flex items-center gap-x-2 group/icon pt-6">
                        <IconPicker
                            onChange={document?.isArchived ? () => toast.warning("Restore page to do this action") : onIconSelect}
                        >
                            <p className="text-4xl md:text-6xl hover:opacity-75 transition">
                                {initialData.icon}
                            </p>
                        </IconPicker>
                        <Button
                            onClick={document?.isArchived ? () => toast.warning("Restore page to do this action") : onIconRemove}
                            className={cn(
                                "rounded-full transition text-muted-foreground text-xs",
                                isMobile ? "opacity-100" : "opacity-0 group-hover/icon:opacity-100"
                            )}
                            variant="outline"
                            size="icon"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            {!!initialData.icon && preview &&
                (
                    <p className="text-4xl md:text-6xl pt-6">
                        {initialData.icon}
                    </p>

                )}
            <div className={cn(
                "flex items-center gap-x-1 py-4",
                isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
                {!initialData.icon && !preview &&
                    (
                        <IconPicker
                            asChild
                            onChange={onIconSelect}
                            disabled={document?.isArchived}
                        >
                            <Button
                                className="text-muted-foreground text-xs"
                                variant="outline"
                                size="sm"
                            >
                                <Smile className="h-4 w-4 mr-2" />
                                Add icon
                            </Button>
                        </IconPicker>

                    )
                }
            </div>
            {
                (isEditing && !preview) ? (
                    <TextareaAutoSize
                        ref={inputRef}
                        onBlur={disableInput}
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        className="w-full text-3xl sm:text-4xl md:text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none mb-5"
                    />
                ) : (
                    <div
                        onClick={document?.isArchived ? () => toast.warning("Restore page to do this action") : enableInput}
                        className="w-full text-3xl sm:text-4xl md:text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] mb-9"
                    >
                        {initialData.title}
                    </div>
                )
            }
        </div >
    );
}

export default Toolbar;