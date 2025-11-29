import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { MenuIcon } from "lucide-react"
import { useParams } from "next/navigation"
import Title from "./title"
import Banner from "./banner"
import Menu from "./menu"
import { Publish } from "./publish"

interface NavbarProps {
    isCollapsed: boolean,
    onResetWidth: () => void
};

export const Navbar = (
    {
        isCollapsed,
        onResetWidth
    }: NavbarProps
) => {

    const params = useParams();

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    })

    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex justify-between items-center">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton />
                </div>
            </nav>
        )
    }

    if (document === null) {
        return null;
    }


    return (
        <>
            {
                !document.isArchived && (
                    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full">
                        <div className="flex items-center gap-x-2 md:gap-x-4 max-w-full">
                            {
                                isCollapsed && (
                                    <MenuIcon
                                        role="button"
                                        onClick={onResetWidth}
                                        className="h-6 w-6 text-muted-foreground cursor-pointer flex-shrink-0"
                                    />
                                )
                            }

                            <div className="flex-1 min-w-0 overflow-hidden">
                                <Title initialData={document} />
                            </div>

                            <div className="flex items-center gap-x-1 sm:gap-x-2 flex-shrink-0">
                                <Publish initialData={document} />
                                <Menu documentId={document._id} />
                            </div>
                        </div>
                    </nav>
                )
            }

            {document.isArchived && (

                <nav className="w-full bg-background border-b border-border sticky top-0 z-50">
                    <div
                        className="
            bg-blue-50 dark:bg-blue-950 
            border-b 
            border-blue-200 dark:border-blue-900
        "
                    >
                        {isCollapsed && (
                            <div className="px-4 flex items-center">
                                <button
                                    onClick={onResetWidth}
                                    className="
                        p-2 
                        hover:bg-blue-100 dark:hover:bg-blue-900/40 
                        rounded-md 
                        transition-all duration-200 
                        group
                    "
                                    aria-label="Expand sidebar"
                                >
                                    <MenuIcon className="h-5 w-5 text-blue-900 dark:text-blue-200 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        )}
                        <Banner documentId={document._id} />
                    </div>
                </nav>
            )}
        </>
    )
}