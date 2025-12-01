"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal, Trash, FileDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface MenuProps {
    documentId: Id<"documents">
}

const Menu = (
    { documentId }: MenuProps
) => {

    const router = useRouter();
    const { user } = useUser();
    const archive = useMutation(api.documents.archive);

    // Fetch document data for export
    const document = useQuery(api.documents.getById, {
        documentId: documentId,
    });

    const [isExporting, setIsExporting] = useState(false);

    const onArchive = () => {
        const promise = archive({ id: documentId });

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash",
            error: "Failed to archive note."
        });
        router.push(`/documents/${documentId}`);
    }

    const onExportPDF = async () => {
        if (!document) {
            toast.error("Document not found");
            return;
        }

        if (!document.content) {
            toast.error("No content to export");
            return;
        }

        setIsExporting(true);

        // Show loading toast
        const exportToast = toast.loading("Preparing your PDF...");

        try {
            const response = await fetch("/api/export-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: document.title || "Untitled",
                    content: document.content,
                    coverImage: document.coverImage,
                    icon: document.icon,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate PDF");
            }

            // Update toast to downloading
            toast.loading("Downloading PDF...", { id: exportToast });

            // Get the PDF blob
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = window.document.createElement("a");
            a.href = url;
            a.download = `${document.title || "document"}.pdf`;
            window.document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            window.document.body.removeChild(a);

            // Success toast
            toast.success("PDF exported successfully!", { id: exportToast });
        } catch (error) {
            console.error("Export error:", error);
            // Error toast
            toast.error("Failed to export PDF. Please try again.", { id: exportToast });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0 hover:bg-primary/10 transition-all duration-200 hover:scale-105 data-[state=open]:bg-primary/15"
                >
                    <MoreHorizontal className="h-4 w-4 transition-transform duration-200" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64 shadow-lg border-primary/10 backdrop-blur-sm"
                align="end"
                alignOffset={8}
                forceMount
            >
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Document Actions
                </div>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem
                    onClick={onExportPDF}
                    disabled={isExporting || !document}
                    className="cursor-pointer focus:bg-primary/10 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FileDown className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    <span>{isExporting ? "Exporting..." : "Export as PDF"}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-primary/10" />

                <DropdownMenuItem
                    onClick={onArchive}
                    className="cursor-pointer focus:bg-destructive/10 focus:text-destructive transition-colors group"
                >
                    <Trash className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    <span>Delete</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-primary/10" />

                <div className="px-2 py-2 text-xs text-muted-foreground/70 italic flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse" />
                    <span>Last edited by: {user?.fullName}</span>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-9 w-9 rounded-md" />
    )
}

export default Menu;
