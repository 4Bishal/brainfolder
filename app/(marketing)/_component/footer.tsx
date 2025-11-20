"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const Footer = () => {
    return (
        <footer className="w-full py-6 border-t">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Text-Based Logo */}
                <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-semibold">
                        BrainFolder
                    </span>

                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Button variant="link" asChild>
                        <Link href="#">
                            Privacy Policy
                        </Link>
                    </Button>

                    <Button variant="link" asChild>
                        <Link href="#">
                            Terms & Conditions
                        </Link>
                    </Button>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
