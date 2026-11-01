import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import ThemeProviders from "@/components/providers/ThemeProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kindora | Community Events",
  description: "Discover and create meaningful community events with Kindora.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors">
        <ToastContainer />
        <ThemeProviders>
          <Navbar />

          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
