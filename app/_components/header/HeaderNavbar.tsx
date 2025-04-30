'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PokemonImage from '@/app/_pictures/PokemonImage.png';
import NavbarImage from "./NavbarImage";
import ResponsiveNavbar from "./ResponsiveNavbar";
import DarkLightSwitch from "./DarkLightSwitch";
import NavbarPages from "@/app/_components/header/NavbarPages";

interface NavbarProps {
    handleChange: () => void;
    mode: boolean;
}

function ResponsiveAppBar({ handleChange, mode }: NavbarProps) {
    const pages = [
        { name: 'Pokémon', url: '/' },
        { name: 'Vergleich', url: '/comparison' },
        { name: 'Beeren', url: '/berry' },
        { name: 'Artikel', url: '/item' }
    ];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container
                maxWidth={false}
                sx={{ margin: '0px', width: "100%" }}
            >
                <Toolbar disableGutters>
                    <NavbarImage
                        imageSrc={PokemonImage}
                        height={50}
                        altText={"Pokemon Image"}
                        linkUrl={pages[0].url}
                    />
                    <ResponsiveNavbar
                        pages={pages}
                        setAnchorElNav={setAnchorElNav}
                        anchorElNav={anchorElNav}
                    />
                    <NavbarPages pages={pages} handleCloseNavMenu={handleCloseNavMenu}/>
                    <DarkLightSwitch handleChange={handleChange} mode={mode} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;