"use client"

import Spinner from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Naviagtion from "./_components/navigation";


const MainLayout = ({
    children
}: {
    children: ReactNode
}) => {



    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        <div className="h-full flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    }

    if (!isAuthenticated) {
        return redirect("/");
    }


    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Naviagtion />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;