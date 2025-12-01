"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { TemplateType } from "@/lib/templates/types";
import { getTemplateContent } from "@/lib/templates/generators";

interface ItemProps {
    id?: Id<"documents">,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    level?: number,
    onExpand?: () => void,
    label: string,
    onClick?: () => void,
    icon: LucideIcon
}

const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {

    const create = useMutation(api.documents.create);
    const router = useRouter();
    const archive = useMutation(api.documents.archive);
    const isMobile = useMediaQuery("(max-width:768px)");

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id });

        toast.promise(promise, {
            loading: "Moving to trash..",
            success: "Note moved to trash!",
            error: "Failed to archive note."
        });
        router.push("/documents")
    }

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, type: TemplateType = "blank") => {
        event.stopPropagation();
        if (!id) return;

        const template = getTemplateContent(type);
        const promise = create({
            title: template.title,
            content: template.content,
            icon: template.icon,
            parentDocument: id
        })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }

                router.push(`/documents/${documentId}`);

                toast.promise(promise, {
                    loading: "Creating a note..",
                    success: "New note Created!",
                    error: "Failed to  create note."
                })
            })

    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;


    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: label ? `${(level * 12) + 12}px` : "12px" }}
            className={cn(
                "group min-h-[32px] text-sm py-1.5 pr-3 w-full flex items-center font-medium cursor-pointer relative transition-all duration-200",
                "hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent",
                "before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary before:opacity-0 before:transition-opacity",
                active && "bg-gradient-to-r from-primary/10 to-transparent text-primary before:opacity-100",
                !active && "text-muted-foreground"
            )}>

            {!!id &&
                <div
                    role="button"
                    className="h-full rounded-md hover:bg-primary/10 mr-1 p-0.5 transition-all duration-200 hover:scale-110"
                    onClick={handleExpand}
                >
                    <ChevronIcon className={cn(
                        "h-4 w-4 shrink-0 transition-all duration-200",
                        expanded ? "text-primary" : "text-muted-foreground/50"
                    )} />
                </div>
            }

            {documentIcon ? (
                <div className="shrink-0 mr-2.5 text-[18px] transition-transform duration-200 group-hover:scale-110">
                    {documentIcon}
                </div>
            ) : (
                <Icon className={cn(
                    "shrink-0 h-[18px] w-[18px] mr-2.5 transition-all duration-200 group-hover:scale-105",
                    active ? "text-primary" : "text-muted-foreground"
                )} />
            )}

            <span className={cn(
                "truncate transition-all duration-200",
                active && "font-semibold"
            )}>
                {label}
            </span>

            {isSearch && (
                <kbd className="ml-auto pointer-events-auto inline-flex h-5 select-none items-center gap-1 rounded-md border bg-gradient-to-b from-muted to-muted/50 px-1.5 font-mono font-medium text-[10px] text-muted-foreground shadow-sm transition-all duration-200 hover:shadow-md">
                    <span className="text-xs">⌘</span>K
                </kbd>
            )}

            {!!id && (
                <div
                    className="ml-auto flex items-center gap-x-1"
                    role="button"
                    onClick={onCreate}
                >
                    <div className={cn(
                        "opacity-0 group-hover:opacity-100 h-7 w-7 flex items-center justify-center rounded-md hover:bg-primary/15 dark:hover:bg-primary/20 transition-all duration-200 hover:scale-110",
                        isMobile && "opacity-100"
                    )}>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
}

Item.Skeleton = function ItemSkeleton({ level }: { level: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2.5 py-[3px] animate-pulse"
        >
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-[30%] rounded-md" />
        </div>
    )
}

export default Item;