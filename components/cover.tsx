"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/user-coverimage";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";

interface CoverImageProps {
    url?: string,
    preview?: boolean
}

const Cover = ({ url, preview }: CoverImageProps) => {

    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);
    const { edgestore } = useEdgeStore();

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    })
    const isMobile = useMediaQuery("(max-width:768px)");

    // Default cover image path
    const defaultCoverImage = "/CoverImageDefault.png";
    const displayUrl = url || defaultCoverImage;

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCoverImage({
            id: params.documentId as Id<"documents">
        })
    }

    return (
        <div className={cn(
            "relative w-full group ",
            !url && isMobile && "h-[20vh]",
            !url && !isMobile && "h-[20vh]",
            url && isMobile && "h-[30vh]",
            url && !isMobile && "h-[35vh]",
            "bg-muted overflow-hidden",
            !preview && "mt-15"
        )}>
            <div className="relative w-full h-full">
                <Image
                    src={displayUrl}
                    fill
                    alt="Cover"
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    quality={90}
                />
                {/* Overlay gradient for better button visibility */}
                <div className={cn(
                    "absolute inset-0 pointer-events-none",
                    isMobile
                        ? "bg-gradient-to-b from-black/20 via-transparent to-transparent"
                        : "bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                )} />
            </div>
            {
                !preview && (
                    <div className={cn(
                        "absolute flex items-center gap-x-2 z-10",
                        isMobile
                            ? "bottom-5 left-5 opacity-100"
                            : "bottom-5 right-5 opacity-0 group-hover:opacity-100"
                    )}>
                        <Button
                            onClick={document?.isArchived ? () => toast.warning("Restore page to do this action") : () => { coverImage.onReplace(url || defaultCoverImage) }}
                            className={cn(
                                "font-medium backdrop-blur-md shadow-xl transition-all border bg-black/60 hover:bg-black/80 dark:bg-white/70 dark:hover:bg-white/90 text-white dark:text-black border-white/20 dark:border-black/20",
                                isMobile
                                    ? "rounded-full w-11 h-11 p-0 flex items-center justify-center"
                                    : "text-xs"
                            )}
                            size={isMobile ? "icon" : "sm"}
                        >
                            <ImageIcon className={cn(
                                isMobile ? "h-5 w-5" : "h-4 w-4 mr-2"
                            )} />
                            {!isMobile && <span className="ml-2">Change Cover</span>}
                        </Button>
                        {url && (
                            <Button
                                onClick={document?.isArchived ? () => toast.warning("Restore page to do this action") : onRemove}
                                className={cn(
                                    "font-medium backdrop-blur-md shadow-xl transition-all border bg-red-600/70 hover:bg-red-600/90 dark:bg-red-500/70 dark:hover:bg-red-500/90 text-white border-white/20 dark:border-red-300/20",
                                    isMobile
                                        ? "rounded-full w-11 h-11 p-0 flex items-center justify-center"
                                        : "text-xs"
                                )}
                                size={isMobile ? "icon" : "sm"}
                            >
                                <X className={cn(
                                    isMobile ? "h-5 w-5" : "h-4 w-4 mr-2"
                                )} />
                                {!isMobile && <span className="ml-2">Remove</span>}
                            </Button>
                        )}
                    </div>
                )
            }
        </div>
    );
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}

export default Cover;