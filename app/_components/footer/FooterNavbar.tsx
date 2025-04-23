'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";

function FooterNavbar() {

    return (
        <AppBar component="footer" position="static" sx={{height: "80px", width: "100%"}}>
            <Container maxWidth={false} sx={{margin: '0rem', height: '100%', width: '100%'}}>
                <Toolbar disableGutters sx={{padding: "0px", height: "100%", width: '100%'}}>
                    <Button variant="text" sx={{
                        color: "white",
                        fontSize: "1.25rem",
                        marginLeft: "3rem"
                    }}>Impressum</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default FooterNavbar;