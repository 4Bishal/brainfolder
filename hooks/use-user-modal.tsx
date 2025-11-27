import { create } from "zustand"

type UserModalStore = {
    isOpen: boolean,
    onOpen: () => void
    onClose: () => void
};

export const useUserModal = create<UserModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));