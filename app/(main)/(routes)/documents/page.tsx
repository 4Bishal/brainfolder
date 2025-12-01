"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import TemplatesGrid from "../../_components/documents/TemplatesGrid";
import TipsSection from "../../_components/documents/TipsSection";
import { getTemplateContent } from "@/lib/templates/generators";
import { TemplateType } from "@/lib/templates/types";
import { Zap, Command, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { api } from "@/convex/_generated/api";

export default function DocumentsPage() {
    const { user } = useUser();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const create = useMutation(api.documents.create);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onCreate = (type: TemplateType = "blank") => {
        const template = getTemplateContent(type);

        const promise = create({
            title: template.title,
            content: template.content,
            icon: template.icon,
        }).then((id) => router.push(`/documents/${id}`));

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create note.",
        });
    };

    return (
        <div className="h-full w-full bg-gradient-to-b from-background to-muted/20 overflow-y-auto md:overflow-hidden">
            <div className="h-full flex items-start md:items-center justify-center px-4 py-8 md:py-0">
                <div className="max-w-5xl w-full space-y-6 md:space-y-8 my-auto md:my-0">

                    {/* Welcome Section */}
                    <div className="text-center space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm mb-3 md:mb-4">
                            <div className="relative w-5 h-5">
                                {mounted && (
                                    <Image
                                        src="/logo.png"
                                        alt="BrainFolder"
                                        fill
                                        className="object-contain dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                                    />
                                )}
                            </div>
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                Your Connected Workspace
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                            Welcome back,{" "}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {user?.firstName}
                            </span>
                            !
                        </h1>

                        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
                            Start by creating your first note or choose from our curated templates to get started quickly.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 px-2">
                        <Button
                            onClick={() => onCreate("blank")}
                            size="lg"
                            className="w-full sm:w-auto text-base h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Create a note
                        </Button>
                    </div>

                    {/* Templates Section */}
                    <div className="space-y-4 md:space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <div className="flex items-center gap-3 px-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                                    Quick start templates
                                </h2>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Choose a template to get started faster
                                </p>
                            </div>
                        </div>

                        <TemplatesGrid onCreate={onCreate} />
                    </div>

                    {/* Tips Section */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                        <TipsSection />
                    </div>

                    {/* Keyboard Shortcut Hint  */}
                    <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground pt-6 animate-in fade-in duration-700 delay-700">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5">
                                <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded border border-border shadow-sm">
                                    <Command className="w-3 h-3" />
                                </kbd>
                                <span className="text-muted-foreground">+</span>
                                <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded border border-border shadow-sm">
                                    K
                                </kbd>
                            </div>
                            <span className="hidden sm:inline">to quickly create or search</span>
                            <span className="sm:hidden">Quick actions</span>
                        </div>
                    </div>

                    {/* Bottom spacing */}
                    <div className="h-12 md:h-0" />
                </div>
            </div>
        </div>
    );
}