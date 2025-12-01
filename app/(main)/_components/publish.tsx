"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import useOrigin from "@/hooks/use-origin"
import { useMutation } from "convex/react"
import { Check, Copy, Globe, Share2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface PublishProps {
    initialData: Doc<"documents">
}

export const Publish = (
    { initialData }: PublishProps
) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true)
        const promise = update({
            id: initialData._id,
            isPublished: true
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note published successfully!",
            error: "Failed to publish note"
        });
    }

    const onUnPublish = () => {
        setIsSubmitting(true)
        const promise = update({
            id: initialData._id,
            isPublished: false
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished successfully!",
            error: "Failed to unpublish note"
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        toast.success("Link copied to clipboard!");

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="group relative hover:bg-primary/10 transition-all duration-200 data-[state=open]:bg-primary/15"
                >
                    <span className="font-medium">
                        {initialData.isPublished ? "Published" : "Publish"}
                    </span>
                    {initialData.isPublished && (
                        <Globe className="text-emerald-500 w-4 h-4 ml-2 animate-pulse" />
                    )}
                    {!initialData.isPublished && (
                        <Share2 className="w-4 h-4 ml-2 transition-transform group-hover:scale-110" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 shadow-xl border-primary/10 backdrop-blur-sm"
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-x-2 pb-2">
                            <div className="relative">
                                <Globe className="h-5 w-5 text-emerald-500" />
                                <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                    Live on the web
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Anyone with the link can view
                                </p>
                            </div>
                        </div>

                        {/* URL Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                                Share link
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 relative group/input">
                                    <input
                                        className="w-full px-3 py-2 text-xs border rounded-lg bg-muted/50 truncate pr-8 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={url}
                                        disabled
                                    />
                                    <Eye className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover/input:opacity-100 transition-opacity" />
                                </div>
                                <Button
                                    size="sm"
                                    className="h-9 px-3 transition-all hover:scale-105"
                                    onClick={onCopy}
                                    disabled={copied}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4 mr-1" />
                                            <span className="text-xs">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-1" />
                                            <span className="text-xs">Copy</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Unpublish Button */}
                        <Button
                            size="sm"
                            disabled={isSubmitting}
                            variant="outline"
                            className="w-full text-xs group hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
                            onClick={onUnPublish}
                        >
                            <EyeOff className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                        {/* Icon with gradient background */}
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl" />
                            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-full">
                                <Globe className="h-8 w-8 text-primary" />
                            </div>
                        </div>

                        {/* Text content */}
                        <h3 className="text-base font-semibold mb-1">
                            Publish this note
                        </h3>
                        <p className="text-xs text-muted-foreground text-center mb-6 max-w-[240px]">
                            Share your work with the world. Anyone with the link will be able to view it.
                        </p>

                        {/* Publish Button */}
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-primary/90"
                            size="default"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Publish Note
                        </Button>

                        {/* Footer hint */}
                        <p className="text-xs text-muted-foreground/60 mt-4 text-center">
                            You can unpublish anytime
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}