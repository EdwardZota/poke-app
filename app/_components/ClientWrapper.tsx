'use client';

import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Navbar from "@/app/_components/header/HeaderNavbar";
import FooterNavbar from "@/app/_components/footer/FooterNavbar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {

    const [mode, setMode] = useState<boolean | null>(null);


    useEffect(() => {
        const storedMode = localStorage.getItem("themeMode");
        if (storedMode !== null) {
            setMode(JSON.parse(storedMode));
        } else {
            setMode(false);
        }
    }, []);


    useEffect(() => {
        if (mode !== null) {
            localStorage.setItem("themeMode", JSON.stringify(mode));
        }
    }, [mode]);


    if (mode === null) return null;

    const appTheme = createTheme({
        palette: {
            mode: mode ? "dark" : "light",
        },
    });

    const handleChange = () => {
        setMode((prev) => !prev);
    };

    return (
        <ThemeProvider theme={appTheme}>
            <Paper elevation={0} sx={{ height: "100vh" }} square>
                <div style={{display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden"}}>
                    <Navbar handleChange={handleChange} mode={mode} />
                    <main style={{ flex: 1, overflowY: "auto" }}>
                        {children}
                    </main>
                    <FooterNavbar />
                </div>
            </Paper>
        </ThemeProvider>
    );
}
