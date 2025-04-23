'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";

function FooterNavbar() {

    return (
        <footer style={{height: "80px"}}>
            <AppBar position="static"  style={{height: "100%"}}>
                <Container maxWidth="xl" style={{margin: '0rem',height: "100%"}}>
                    <Toolbar disableGutters style={{width: '100vw'}}>
                        <Button variant="text" sx={{
                            color: "white",
                            fontSize: "1.25rem",
                            marginLeft: "2rem"
                        }}>Impressum</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </footer>
    );
}

export default FooterNavbar;