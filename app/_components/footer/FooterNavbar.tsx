'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from '@mui/material/Box';

function FooterNavbar() {

    return (
        <AppBar component="footer" position="static" sx={{height: "80px", width: "100%"}}>
            <Container maxWidth={false} sx={{margin: '0rem', height: '100%', width: '100%'}}>
                <Toolbar disableGutters sx={{padding: "0px", height: "100%", width: '100%'}}>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Link href="/impressum">
                            <Button
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    px: "3rem",
                                    fontSize: '1.2rem',
                                    fontWeight: 600
                                }}
                            >
                                Legal notice
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default FooterNavbar;