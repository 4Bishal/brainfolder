"use client";

import { tips } from "@/lib/templates/tips";
import { Lightbulb } from "lucide-react";

export default function TipsSection() {
    return (
        <div className="pt-3 border-t">
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-semibold">Quick tips to get started</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
                {tips.map((tip, i) => (
                    <div key={i} className="p-3 bg-secondary/50 rounded-lg flex gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs text-primary">{i + 1}</span>
                        </div>
                        <div>
                            <p className="font-medium text-sm">{tip.title}</p>
                            <p className="text-xs text-muted-foreground">{tip.description}</p>

                            {tip.shortcut && (
                                <div className="flex gap-1 mt-1">
                                    {tip.shortcut.map((key, j) => (
                                        <kbd key={j} className="px-1 py-0.5 bg-muted border text-xs rounded">
                                            {key}
                                        </kbd>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
