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
import {navPages} from "@/app/_utils/navPages";

interface NavbarProps {
    handleChangeAction: () => void;
    mode: boolean;
}

export default function Navbar({ handleChangeAction, mode }: NavbarProps) {
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
                        linkUrl={navPages[0].url}
                    />
                    <ResponsiveNavbar
                        pages={navPages}
                        setAnchorElNav={setAnchorElNav}
                        anchorElNav={anchorElNav}
                    />
                    <NavbarPages pages={navPages} handleCloseNavMenu={handleCloseNavMenu}/>
                    <DarkLightSwitch handleChangeAction={handleChangeAction} mode={mode} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};