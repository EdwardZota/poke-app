import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientWrapper from "@/app/_components/ClientWrapper";

export const metadata: Metadata = {
    title: "Pokemon-Wiki",
    description: "Generated team ENN xD",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <ClientWrapper>{children}</ClientWrapper>
            </body>
        </html>
    );
}
