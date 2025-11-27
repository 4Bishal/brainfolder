"use client"

import { ChevronsLeftRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";
import { useUserModal } from "@/hooks/use-user-modal";

const UserItem = () => {
    const { user } = useUser();
    const { onOpen } = useUserModal();

    return (
        <div
            role="button"
            onClick={onOpen}
            className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
            <div className="gap-x-2 flex items-center max-w-[150px]">
                <Avatar className="h-5 w-5">
                    <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <span className="text-start font-medium line-clamp-1">
                    {user?.fullName}&apos;s BrainFolder
                </span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
    );
}

export default UserItem;