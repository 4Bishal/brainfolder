"use client"
import { EyeOff, FileX, Lock } from "lucide-react";

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 dark:bg-gradient-to-br dark:from-[#1F1F1F] dark:via-[#1F1F1F] dark:to-[#2A2A2A] p-4">
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="relative">
                    {/* Gradient glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-50" />

                    {/* Content card */}
                    <div className="relative bg-background dark:bg-[#1F1F1F] border-2 border-primary/10 rounded-2xl p-12 shadow-2xl">
                        {/* Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl" />
                                <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-full border-2 border-primary/20">
                                    <EyeOff className="h-12 w-12 text-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="text-center space-y-4 ">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                This page is not published
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                                This document is currently private and only visible to its owner.
                            </p>
                        </div>

                        {/* Features list */}
                        <div className="mt-10 space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-primary/5 hover:border-primary/20 transition-all">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm mb-1">Private Content</h3>
                                    <p className="text-xs text-muted-foreground">
                                        The author has chosen to keep this document private
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-primary/5 hover:border-primary/20 transition-all">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <FileX className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm mb-1">Not Available</h3>
                                    <p className="text-xs text-muted-foreground">
                                        This page cannot be accessed until it's published
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="mt-8 flex justify-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
            </div>
        </div>
    );
}