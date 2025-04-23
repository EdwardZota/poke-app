'use client';
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type ResponsiveNavbarProps = {
    pages: { name: string, url: string }[];
    setAnchorElNav: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    anchorElNav: null | HTMLElement;
};


function ResponsiveNavbar({pages, setAnchorElNav, anchorElNav}: ResponsiveNavbarProps) {

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                className={"Menu1"}
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}

                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }}
            >
                {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
export default ResponsiveNavbar;