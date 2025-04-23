'use client';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import Link from "next/link";

type NavbarPagesProps = {
    pages: { name: string, url: string }[];
    handleCloseNavMenu: () => void;
}

function NavbarPages({handleCloseNavMenu, pages }: NavbarPagesProps) {

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Link key={page.url} href={page.url}>
                    <Button
                        key={page.name}
                        onClick={() => {handleCloseNavMenu()}}
                        sx={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            px: "3rem",
                            fontSize: '1.2rem',
                            fontWeight: 600
                        }}
                    >
                        {page.name}
                    </Button>
                </Link>
            ))}
        </Box>
    );
}export default NavbarPages;