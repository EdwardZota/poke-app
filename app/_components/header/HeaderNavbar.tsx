'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PokemonImage from '../../pictures/PokemonImage.png';
import Searchbar from "./Searchbar";
import NavbarImage from "./NavbarImage";
import ResponsiveNavbar from "./ResponsiveNavbar";
import NavbarPages from "./NavbarPages";
import DarkLightSwitch from "./DarkLightSwitch";
import LanguageSelector from "./LanguageSelector";


function ResponsiveAppBar() {

    const pages = ['Sammlung', 'Vergleich'];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" style={{ margin: '0rem' }}>
                <Toolbar disableGutters style={{ width: '100vw' }}>
                    <NavbarImage imageSrc={PokemonImage} height={50} altText={"Pokemon Image"} linkUrl={""} />
                    <ResponsiveNavbar pages={pages} setAnchorElNav={setAnchorElNav} anchorElNav={anchorElNav} />
                    <NavbarPages pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
                    <Searchbar />
                    <LanguageSelector />
                    <DarkLightSwitch />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;