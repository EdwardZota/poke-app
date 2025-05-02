import type { Metadata } from "next";
import "./globals.css";
import React, {ReactNode} from "react";
import Layout from "@/app/_components/Layout";

export const metadata: Metadata = {
    title: "Pokemon-Wiki",
    description: "Generated team ENN xD",
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
