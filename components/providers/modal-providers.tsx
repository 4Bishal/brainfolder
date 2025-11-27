"use client"

import { useEffect, useState } from "react"
import { TrashBoxModal } from "../modal/trashbox-modal"
import { CoverImageModal } from "../modal/cover-image"
import UserModal from "../modal/user-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <TrashBoxModal />
            <CoverImageModal />
            <UserModal />
        </>
    )
}