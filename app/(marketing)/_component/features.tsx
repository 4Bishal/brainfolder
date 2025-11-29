import { FileText, ImagePlus, Zap, Cloud, Search, Layout } from "lucide-react";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Features = () => {
    const features: Feature[] = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Rich Text Editor",
            description: "Full markdown support with intuitive formatting tools"
        },
        {
            icon: <ImagePlus className="w-6 h-6" />,
            title: "Media Embeds",
            description: "Seamlessly embed images, videos, and links"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Keyboard Shortcuts",
            description: "Lightning-fast workflows for power users"
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: "Real-time Sync",
            description: "Access your notes from anywhere, always in sync"
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: "Powerful Search",
            description: "Find anything instantly with intelligent search"
        },
        {
            icon: <Layout className="w-6 h-6" />,
            title: "Flexible Export",
            description: "Export to PDF, Markdown, or HTML"
        }
    ];

    return (
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                        Everything you need
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Powerful features designed to help you organize, create, and collaborate effortlessly
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-neutral-900 dark:text-neutral-100">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                                {feature.title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;