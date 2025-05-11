'use client';

import React, {ReactNode, useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Navbar from "@/app/_components/header/Navbar";
import FooterNavbar from "@/app/_components/footer/FooterNavbar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    const [mode, setMode] = useState<boolean | null>(null);

    useEffect(() => {
        const storedMode = localStorage.getItem("themeMode");
        if (storedMode !== null) {
            try {
                const parsed = JSON.parse(storedMode) as boolean;
                setMode(parsed);
            } catch {
                setMode(false);
            }
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
        typography: {
            allVariants: mode
                ? {
                    color: "white",
                    textShadow: `
                -1px -1px 0 black,
                 1px -1px 0 black,
                -1px  1px 0 black,
                 1px  1px 0 black`,
                }
                : {},
        },
    });

    const handleChange = () => {
        setMode((prev) => !prev);
    };

    return (
        <ThemeProvider theme={appTheme}>
            <Paper elevation={0} sx={{height: "100vh"}} square>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflow: "hidden"
                }}>
                    <Navbar handleChangeAction={handleChange} mode={mode}/>
                    <main style={{flex: 1, overflowY: "auto"}}>
                        {children}
                    </main>
                    <FooterNavbar/>
                </div>
            </Paper>
        </ThemeProvider>
    );
}
