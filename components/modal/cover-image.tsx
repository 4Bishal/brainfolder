"use client"

import { useCoverImage } from "@/hooks/user-coverimage"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "../single-image-dropzone";


export const CoverImageModal = () => {
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();
    const [file, setFile] = useState<File>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const update = useMutation(api.documents.update);
    const params = useParams();

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async (file?: File) => {

        if (file) {
            setFile(file);
            setIsSubmitting(true);

            let res;

            if (coverImage.url) {
                res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: coverImage.url,
                    },
                });
            } else {
                res = await edgestore.publicFiles.upload({
                    file
                });
            }
            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            })

            onClose();
        }
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <SingleImageDropzone
                        onChange={onChange}
                        disabled={isSubmitting}
                        value={file}
                        className="w-full outline-none"
                    />
                </div>
            </DialogContent>

        </Dialog>
    )
}