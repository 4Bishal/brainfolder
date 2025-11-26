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

const DocumentIdPage = (
) => {

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
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
    );
}

export default DocumentIdPage;