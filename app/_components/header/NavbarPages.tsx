'use client';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";

type NavbarPagesProps = {
    pages: string[];
    handleCloseNavMenu: () => void;
}

function NavbarPages({handleCloseNavMenu, pages}: NavbarPagesProps) {

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        px: "3rem",
                        fontSize: '1.2rem',
                        fontWeight: 600
                    }}
                >
                    {page}
                </Button>
            ))}
        </Box>
    )
}export default NavbarPages;