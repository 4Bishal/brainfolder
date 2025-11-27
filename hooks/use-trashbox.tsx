import { create } from "zustand"

type TrashProps = {
    isOpen: boolean,
    onOpen: () => void
    onClose: () => void
};


export const useTrashBox = create<TrashProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
})); 