"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useUserModal } from "@/hooks/use-user-modal";
import { useTheme } from "next-themes";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const UserModal = () => {
    const { user } = useUser();
    const { isOpen, onClose } = useUserModal();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={!isMobile ? "max-w-2xl max-h-[600px] p-0 gap-0 overflow-hidden" : "max-w-2xl max-h-[600px] p-1  gap-0    overflow-hidden  w-[calc(100%-24px)]  sm:w-auto rounded-xl"}>
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-lg">Account</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col px-6 pb-6 space-y-4">
                    {/* User Info */}
                    <div
                        className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? "bg-zinc-800/50" : "bg-zinc-100"
                            }`}
                    >
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p
                                className={`text-sm font-medium truncate ${isDark ? "text-zinc-100" : "text-zinc-900"
                                    }`}
                            >
                                {user?.fullName}
                            </p>
                            <p
                                className={`text-xs truncate ${isDark ? "text-zinc-400" : "text-zinc-500"
                                    }`}
                            >
                                {user?.emailAddresses[0].emailAddress}
                            </p>
                        </div>
                    </div>

                    <Separator className={isDark ? "bg-zinc-800" : "bg-zinc-200"} />

                    {/* Logout Button */}
                    <SignOutButton>
                        <Button
                            variant="ghost"
                            className={`w-full justify-center h-10 cursor-pointer ${isDark
                                ? "text-zinc-400 hover:text-red-400 hover:bg-red-950/30"
                                : "text-zinc-600 hover:text-red-600 hover:bg-red-50"
                                } ${isMobile && "border"}`}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log out
                        </Button>
                    </SignOutButton>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;
