"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface ProductImage {
    src: string;
    alt: string;
}

const DemoSection = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const productImages: ProductImage[] = [
        { src: "/ProductMarketingdark.png", alt: "Dark themed interface" },
        { src: "/ProductMarketinglight.png", alt: "Light themed interface" },
        { src: "/Branding.png", alt: "Collaboration workspace" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % productImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [productImages.length]);

    const benefits: string[] = [
        "Rich text editor with markdown support",
        "Embed images, videos, and links seamlessly",
        "Keyboard shortcuts for power users",
        "Real-time sync across all devices",
        "Export to PDF, Markdown, or HTML"
    ];

    return (
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
                                Your workspace, your way
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Organize notes with nested pages, add rich content with embeds and images,
                                and find anything instantly with powerful search.
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3 group">
                                    <CheckCircle className="w-5 h-5 text-neutral-900 dark:text-neutral-100 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-neutral-600 dark:text-neutral-400">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image Carousel */}
                    <div className="order-1 lg:order-2">
                        <div className="relative aspect-video rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden shadow-2xl">
                            {productImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95"
                                        }`}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Indicator Dots */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            {productImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                                        ? "w-8 h-2 bg-neutral-900 dark:bg-neutral-100"
                                        : "w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;