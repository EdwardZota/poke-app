'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PokemonImage from '@/app/pictures/PokemonImage.png';
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
        <header style={{height: "80px"}}>
            <AppBar position="static">
                <Container maxWidth="xl" style={{margin: '0rem'}}>
                    <Toolbar disableGutters>
                        <NavbarImage imageSrc={PokemonImage} height={50}
                                     altText={"Pokemon Image"} linkUrl={"/"}/>
                        <ResponsiveNavbar pages={pages}
                                          setAnchorElNav={setAnchorElNav}
                                          anchorElNav={anchorElNav}/>
                        <NavbarPages pages={pages}
                                     handleCloseNavMenu={handleCloseNavMenu}/>
                        <LanguageSelector/>
                        <DarkLightSwitch/>
                    </Toolbar>
                </Container>
            </AppBar>

        </header>
    );
}

export default ResponsiveAppBar;