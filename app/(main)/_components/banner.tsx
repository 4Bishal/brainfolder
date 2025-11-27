"use client"

import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertTriangle, Undo2, Trash2 } from "lucide-react";

interface BannerProps {
    documentId: Id<"documents">
};

const Banner = (
    { documentId }: BannerProps
) => {

    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note"
        });

        router.push("/documents")
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note"
        });
        router.push(`/documents/${documentId}`);
    }

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-4 flex-wrap">

                    {/* Informational status */}
                    <div className="flex items-center gap-2 text-blue-900/90 dark:text-blue-100/90">
                        <div className="p-1.5 bg-blue-100/40 dark:bg-blue-900/30 rounded-full">
                            <AlertTriangle className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                        </div>
                        <p className="font-medium text-sm sm:text-base">
                            This page is in the Trash (Informational)
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">

                        {/* Restore: soft blue (recovery information) */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="
                        border-blue-300/40 
                        bg-blue-100/30 
                        text-blue-900/90 dark:text-blue-100
                        hover:bg-blue-200/40 
                        hover:border-blue-400/50
                        transition-all duration-200
                        cursor-pointer
                    "
                            onClick={onRestore}
                        >
                            <Undo2 className="h-4 w-4 mr-1.5" />
                            Restore Page
                        </Button>

                        {/* Delete Forever: NOT red, but neutral informational grey */}
                        <ConfirmModal onConfirm={onRemove}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="
                            border-slate-300/40
                            bg-slate-200/30 dark:bg-slate-700/30
                            text-slate-800 dark:text-slate-200
                            hover:bg-slate-300/40 dark:hover:bg-slate-600/40
                            hover:border-slate-400/60
                            transition-all duration-200
                            cursor-pointer
                        "
                            >
                                <Trash2 className="h-4 w-4 mr-1.5" />
                                Delete Forever
                            </Button>
                        </ConfirmModal>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default Banner;