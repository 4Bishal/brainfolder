import React from "react";
import Navbar from "./_component/navbar";
import { Pacifico } from "next/font/google";

interface MarketingLayoutProps {
    children: React.ReactNode;
}

export const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
});

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="h-full">
                {children}
            </main>
        </div>
    );
};

export default MarketingLayout;