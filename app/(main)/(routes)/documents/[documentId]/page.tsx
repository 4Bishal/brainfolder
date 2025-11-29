"use client"

import Toolbar from "@/app/(main)/_components/toolbar";
import Cover from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ErrorPage from "@/app/error";
import { AlertCircle } from "lucide-react";

const DocumentIdPage = () => {

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);

    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });
    const update = useMutation(api.documents.update);

    if (document === undefined) {
        return (
            <div className="overflow-x-hidden">
                <Cover.Skeleton />
                <div className="w-full px-1 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto mt-3 md:mt-10">
                    <div className="space-y-4 pt-4">
                        <Skeleton className="h-10 sm:h-12 md:h-14 w-[70%] sm:w-[50%]" />
                        <Skeleton className="h-4 w-[90%] sm:w-[80%]" />
                        <Skeleton className="h-4 w-[60%] sm:w-[40%]" />
                        <Skeleton className="h-4 w-[80%] sm:w-[60%]" />
                    </div>
                </div>
            </div>
        )
    }

    if (document === null) {
        return (
            <ErrorPage />
        );
    }

    const onChange = (content: string) => {
        update({
            id: document._id,
            content
        })
    };

    return (
        <div className="pb-16 sm:pb-32 md:pb-40 overflow-x-hidden">
            <Cover url={document.coverImage} />
            <div className="w-full px-1 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
                <Toolbar initialData={document} />
                <div className="overflow-x-hidden w-full">
                    <Editor
                        editable={!document.isArchived}
                        onChange={onChange}
                        initialContent={document.content}
                    />
                </div>
                {document.isArchived && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 sm:mt-8 p-3 sm:p-4 bg-muted/50 rounded-lg border border-muted-foreground/20 mx-1 sm:mx-auto max-w-md">
                        <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-left">
                            Restore the page to edit this note
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DocumentIdPage;