import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-providers";
import ConvexClientProvider from "@/components/providers/convex-providers";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-providers";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { SonnerToaster } from "@/components/providers/toaster-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainFolder",
  description: "BrainFolder organizes your notes, tasks, documents, and ideas into one structured workspace — helping you think clearly and work smarter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="BrainFolder-Theme"
            >
              <SonnerToaster />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>

      </body>
    </html >
  );
}
