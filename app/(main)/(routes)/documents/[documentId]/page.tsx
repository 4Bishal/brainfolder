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
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
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
        <div className="pb-40">
            <Cover url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor
                    editable={!document.isArchived}
                    onChange={onChange}
                    initialContent={document.content}
                />
                {document.isArchived && (
                    <div className="flex items-center justify-center gap-2 mt-8 p-4 bg-muted/50 rounded-lg border border-muted-foreground/20">
                        <AlertCircle className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground font-medium">
                            Restore the page to edit this note
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DocumentIdPage;