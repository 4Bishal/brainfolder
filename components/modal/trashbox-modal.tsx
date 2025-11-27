"use client"

import { useTrashBox } from "@/hooks/use-trashbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import Spinner from "../ui/spinner";
import { Search, Trash, Undo, FileText, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { ConfirmModal } from "./confirm-modal";
import { useMediaQuery } from "usehooks-ts";

export const TrashBoxModal = () => {
    const trash = useTrashBox();
    const router = useRouter();
    const { isAuthenticated } = useConvexAuth();
    const documents = useQuery(api.documents.getTrash, trash.isOpen && isAuthenticated ? {} : "skip");
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const isMobile = useMediaQuery("(max-width:768px)");

    const filterDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
        trash.onClose();
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        });
    }

    const onRemove = (
        documentId: Id<"documents">
    ) => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        });

        router.push("/documents");
    };

    if (!trash.isOpen) {
        return null;
    }

    return (
        <Dialog open={trash.isOpen} onOpenChange={trash.onClose}>
            <DialogContent
                className={!isMobile ? "max-w-2xl max-h-[600px] p-0 gap-0 overflow-hidden" : "max-w-2xl max-h-[600px] p-1  gap-0    overflow-hidden  w-[calc(100%-24px)]  sm:w-auto rounded-xl"}
            >

                <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-destructive/10">
                            <Trash2 className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold">
                                Trash
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {filterDocuments?.length || 0} {filterDocuments?.length === 1 ? 'item' : 'items'} in trash
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4 border-b bg-background">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-10 bg-muted/50 border-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-primary/20"
                            placeholder="Search deleted notes..."
                        />
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[400px] px-4 py-2">
                    {documents === undefined ? (
                        <div className="flex items-center justify-center py-16">
                            <Spinner size="lg" />
                        </div>
                    ) : filterDocuments?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="p-4 rounded-full bg-muted/50 mb-4">
                                <Trash2 className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">No documents found</h3>
                            <p className="text-sm text-muted-foreground">
                                {search ? "Try adjusting your search" : "Your trash is empty"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filterDocuments?.map((document) => (
                                <div
                                    key={document._id}
                                    onClick={() => { onClick(document._id) }}
                                    className="group relative flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
                                >
                                    <div className="p-2 rounded-md bg-muted/50 group-hover:bg-background transition-colors">
                                        {document.icon
                                            ?
                                            (
                                                <p>
                                                    {document.icon}
                                                </p>
                                            )
                                            :
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                        }
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate text-foreground">
                                            {document.title}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                        <div
                                            role="button"
                                            onClick={(e) => { onRestore(e, document._id) }}
                                            className="p-2 rounded-md hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
                                            title="Restore"
                                        >
                                            <Undo className="h-4 w-4" />
                                        </div>
                                        <ConfirmModal onConfirm={() => { onRemove(document._id) }}>
                                            <div
                                                role="button"
                                                className="p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                                                title="Delete permanently"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </div>
                                        </ConfirmModal>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog >
    )
}