import React, { useEffect, useState } from "react";
import { AbilityInfo, LessPokemonDetail } from "@/app/_utils/SinglePokemonInfo";
import Link from "next/link";
import {Box, Card, CardMedia, Typography} from "@mui/material";
import grassImg from "@/app/_pictures/pokemonCardTemplate/grass.png";
import fireImg from "@/app/_pictures/pokemonCardTemplate/fire.png";
import normalImg from "@/app/_pictures/pokemonCardTemplate/normal.png";
import darknessImg from "@/app/_pictures/pokemonCardTemplate/darkness.png";
import dragonImg from "@/app/_pictures/pokemonCardTemplate/dragon.png";
import fairyImg from "@/app/_pictures/pokemonCardTemplate/fairy.png"
import fightingImg from "@/app/_pictures/pokemonCardTemplate/fighting.png"
import lightningImg from "@/app/_pictures/pokemonCardTemplate/lightning.png"
import psychicImg from "@/app/_pictures/pokemonCardTemplate/psychic.png"
import steelImg from "@/app/_pictures/pokemonCardTemplate/steel.png"
import waterImg from "@/app/_pictures/pokemonCardTemplate/water.png"
import defaultImg from "@/app/_pictures/pokemonCardTemplate/blank.png"
import {getAbilityInfo} from "@/app/_services/pokemonApi";
import backgroundImage from "@/app/_pictures/pokemonCardTemplate/backgroundImage.jpg"
import missingNo from "@/app/_pictures/pokemonCardTemplate/missingNo.png"
import {StaticImageData} from "next/image";

interface Props {
    pokemon: LessPokemonDetail;
}

const PokemonCard = ({pokemon}: Props) => {

    const primaryType = pokemon.types[0].type.name;
    const typesImage: Record<string, StaticImageData> = {
        normal: normalImg,
        fire: fireImg,
        water: waterImg,
        electric: lightningImg,
        grass: grassImg,
        ice: waterImg,
        fighting: fightingImg,
        poison: psychicImg,
        ground: fightingImg,
        flying: normalImg,
        psychic: psychicImg,
        bug: grassImg,
        rock: fightingImg,
        ghost: darknessImg,
        dragon: dragonImg,
        dark: darknessImg,
        steel: steelImg,
        fairy: fairyImg,
    };
    const typeImage: StaticImageData = typesImage[primaryType] ?? defaultImg;

    const [abilitiesInfo, setAbilitiesInfo] = useState<AbilityInfo[]>([]);

    useEffect(() => {
        const fetchAbilities = async () => {
            const abilitiesData = await Promise.all(
                pokemon.abilities.map(async (ability) => {
                    const abilityId = getAbilityIdFromUrl(ability.ability.url);
                    return await getAbilityInfo(abilityId);
                })
            );
            setAbilitiesInfo(abilitiesData);
        };

        fetchAbilities();
    }, [pokemon.abilities]);

    function getAbilityIdFromUrl(url: string) {
        const parts = url.split("/").filter(Boolean);
        return parseInt(parts[parts.length - 1]);
    }

    function toPascalCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Link href={`/pokemon/${pokemon.name}`} style={{textDecoration: "none"}}>
            <Card
                sx={{
                    backgroundImage: `url(${typeImage.src ?? ''})`,
                    height: "35rem",
                    width: "25rem",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "1.25rem",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "1.25rem",
                        paddingLeft: "6rem",
                        paddingRight: "3.5rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "10rem",
                        }}
                    >{toPascalCase(pokemon.name)}</Typography>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Typography
                            sx={{
                                fontSize: "0.7rem",
                                paddingTop: "0.65rem",
                                fontWeight: "bold",
                                paddingRight: "0.1rem",
                            }}
                        >HP</Typography>
                        <Typography sx={{fontSize: "1.2rem", paddingTop: "0.15rem", fontWeight: "bold"}}>
                            {pokemon.stats[0].base_stat}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        height: "13.75rem",
                        width: "auto",
                        marginLeft: "2.2rem",
                        marginRight: "2.1rem",
                        marginTop: "0.4rem",
                        marginBottom: "1rem",
                        backgroundImage: `url(${backgroundImage.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "0.1rem",
                        overflow: "hidden",
                    }}
                >
                    <CardMedia
                        component="img"
                        src={pokemon.sprites.other.dream_world?.front_default || missingNo.src}
                        sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                            padding: "1rem",
                        }}
                        alt={pokemon.name}
                    />
                </Box>


                <Box
                    sx={{
                        height: "11.25rem",
                        width: "95%",
                        marginTop: "1rem",
                        overflowY: "auto",
                        maxHeight: "12.25rem",
                        scrollbarColor: "#ffffff transparent",
                    }}
                >
                    {abilitiesInfo.map((ability, index) => (
                        <Box key={index} sx={{paddingLeft: "2.5rem", paddingRight: "2.5rem", paddingTop: "0.5rem"}}>
                            <Typography sx={{fontSize: "1rem"}} variant="body1" fontWeight="bold">
                                {toPascalCase(ability.name)}
                            </Typography>
                            <Typography sx={{fontSize: "0.9rem"}} variant="body2">
                                {ability.effect_entries[0].short_effect}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {pokemon.id >= 1000 ? (
                    <Box sx={{
                        height: "3rem",
                        width: "10rem",
                        marginLeft: "12.75rem",
                        marginTop: "0.8rem",
                        fontWeight: "bold"
                    }}>
                        Pokédex ID: {pokemon.id}
                    </Box>
                ) : (
                    <Box sx={{
                        height: "3rem",
                        width: "10rem",
                        marginLeft: "13.5rem",
                        marginTop: "0.8rem",
                        fontWeight: "bold"
                    }}>
                        Pokédex ID: {pokemon.id}
                    </Box>
                )}
            </Card>
        </Link>
    );
};

export default PokemonCard;