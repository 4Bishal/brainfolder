"use client";

import { templates } from "@/lib/templates/templates";
import { TemplateType } from "@/lib/templates/types";

interface Props {
    onCreate: (type: TemplateType) => void;
}

export default function TemplatesGrid({ onCreate }: Props) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map((item, i) => (
                <button
                    key={i}
                    onClick={() => onCreate(item.type)}
                    className="group p-3 rounded-lg border bg-card hover:bg-accent transition-all text-left"
                >
                    <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                            <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-sm group-hover:text-primary transition">
                                {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
