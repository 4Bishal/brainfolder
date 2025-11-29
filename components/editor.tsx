"use client"

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core"

import {
    useCreateBlockNote
} from "@blocknote/react";

import {
    BlockNoteView
} from "@blocknote/mantine"

import "@blocknote/mantine/style.css"
import "@blocknote/core/fonts/inter.css";


import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";


interface EditorProps {
    onChange: (content: string) => void,
    initialContent?: string,
    editable?: boolean
};



const Editor: React.FC<EditorProps> = ({
    onChange,
    initialContent,
    editable,
}) => {

    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })
        return response.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
        tables: {
            cellBackgroundColor: true,
            cellTextColor: true,
            headers: true,
            splitCells: true,

        },
        uploadFile: handleUpload,
    });

    const { resolvedTheme } = useTheme();
    return (
        <div className="w-full max-w-full">
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={(resolvedTheme === "dark") ? "dark" : "light"}
                onChange={(editor) => onChange(JSON.stringify(editor.topLevelBlocks, null, 2))}
            />
        </div>
    )
}

export default Editor