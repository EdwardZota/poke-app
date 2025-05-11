'use client';

import {
    Typography,
    Box,
    CardMedia,
    Link,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody
} from '@mui/material';
import {AbilityInfo, AllPokemonDetail, EvolutionChain,} from "@/app/_utils/SinglePokemonInfo";
import {getAbilityInfo, getLessPokemonDetail, getPokemonEvolution} from "@/app/_services/pokemonApi";
import React, {useEffect, useState} from "react";
import {NameAndUrl} from "@/app/_utils/NameAndUrl";
import missingNo from "@/app/_pictures/pokemonCardTemplate/missingNo.png"
import grassType from "@/app/_pictures/types/grass.png"
import dragonType from "@/app/_pictures/types/dragon.png"
import poisonType from "@/app/_pictures/types/poison.png"
import darknessType from "@/app/_pictures/types/darkness.png"
import waterType from "@/app/_pictures/types/water.png"
import fireType from "@/app/_pictures/types/fire.png"
import fairyType from "@/app/_pictures/types/fairy.png"
import fightingType from "@/app/_pictures/types/fighting.png"
import lightningType from "@/app/_pictures/types/lightning.png"
import normalType from "@/app/_pictures/types/normal.png"
import steelType from "@/app/_pictures/types/steel.png"
import {StaticImageData} from "next/image";

interface Props {
    pokemon: AllPokemonDetail;
}

export default function PokemonDetail({pokemon}: Props) {
    const [namePics, setNamePics] = useState<NameAndUrl[]>([]);
    const [abilitiesInfo, setAbilitiesInfo] = useState<AbilityInfo[]>([]);

    const staticFields = [
        {label: "Id", value: pokemon.id},
        {label: "Order", value: pokemon.order},
        {label: "Height", value: pokemon.height},
        {label: "Weight", value: pokemon.weight},
    ];

    useEffect(() => {
        const fetchData = async () => {
            const pokemonEvo = await getPokemonEvolution(pokemon.name);

            const extractNames = (chain: EvolutionChain): string[] =>
                [chain.species.name, ...chain.evolves_to.flatMap((e) => extractNames(e))];

            const names = extractNames(pokemonEvo.data.chain);

            const pics = await Promise.all(
                names.map(async (name) => {
                    const pokemonInfo = await getLessPokemonDetail(name);
                    return {
                        name,
                        url: pokemonInfo.sprites.other.dream_world.front_default
                    };
                })
            );

            setNamePics(pics);
        };

        fetchData();
    }, [pokemon.name]);

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

    const typesImage: Record<string, StaticImageData> = {
        normal: normalType,
        fire: fireType,
        water: waterType,
        electric: lightningType,
        grass: grassType,
        ice: waterType,
        fighting: fightingType,
        poison: poisonType,
        ground: fightingType,
        flying: normalType,
        psychic: poisonType,
        bug: grassType,
        rock: fightingType,
        ghost: darknessType,
        dragon: dragonType,
        dark: darknessType,
        steel: steelType,
        fairy: fairyType,
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{
                display: "flex", flexDirection: "row",
                marginTop: "2rem",
                textTransform: "capitalize",
                alignItems: "center"
            }}>
                <Typography variant="h3" component="h1">
                    {pokemon.name}
                </Typography>

                <Box sx={{display: "flex", paddingLeft: "2rem"}}>
                    <CardMedia
                        component="img"
                        image={pokemon.sprites.other.dream_world.front_default}
                        alt={pokemon.name}
                        sx={{objectFit: 'contain', height: '5rem', width: "5rem"}}
                    />
                </Box>
            </Box>

            <Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", py: "3rem"}}>
                    <TableContainer sx={{width: "40rem"}} component={Paper}>
                        <Table>
                            <TableHead sx={{backgroundColor: "lightgrey"}}>
                                <TableRow>
                                    <TableCell sx={{width: "7.5rem"}}>Stat Name</TableCell>
                                    <TableCell sx={{width: "5rem"}} align="center">Base Value</TableCell>
                                    <TableCell sx={{width: "5rem"}} align="center">Effort</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pokemon.stats.map((s, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell sx={{textTransform: "capitalize"}}>{s.stat.name}</TableCell>
                                        <TableCell align="center">{s.base_stat}</TableCell>
                                        <TableCell align="center">{s.effort || '-'}</TableCell>
                                    </TableRow>
                                ))}
                                {staticFields.map((field, idx) => (
                                    <TableRow key={`static-${idx}`}>
                                        <TableCell sx={{textTransform: "capitalize"}}>{field.label}</TableCell>
                                        <TableCell align="center"
                                                   sx={{textTransform: "capitalize"}}>{field.value}</TableCell>
                                        <TableCell align="center">-</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box sx={{paddingTop: "2rem"}}>
                    <Typography variant="h4" sx={{mb: 2}}>
                        Abilities
                    </Typography>

                    {abilitiesInfo.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <ol style={{ paddingLeft: '2rem' }}>
                                {abilitiesInfo.map((ability, index) => (
                                    <li key={ability.name}>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                                {index + 1}. {ability.name}
                                            </Typography>
                                            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                                                {
                                                    ability.effect_entries.find(e => e.language.name === "en")?.effect
                                                    || "No description available."
                                                }
                                            </Typography>
                                        </Box>
                                    </li>
                                ))}
                            </ol>
                        </Box>
                    )}

                </Box>

                <Box>
                    <Typography variant="h4">Types</Typography>
                    <Box sx={{paddingTop: "1.5rem", paddingLeft: '2rem'}}>
                        {pokemon.types.map((t) => (
                            <Box key={t.type.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <CardMedia
                                    component="img"
                                    image={typesImage[t.type.name]?.src || missingNo.src}
                                    alt={t.type.name}
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                                    {t.type.name}
                                </Typography>
                            </Box>
                        ))}

                    </Box>
                </Box>

                <Box>
                    <Typography variant="h4" sx={{mt: 4}}>Evolutions</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        {namePics.map(({name, url}) => (
                            <Link
                                key={name}
                                href={`/pokemon/${name}`}
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '32%',
                                    mb: 3,
                                    color: 'inherit',
                                    textAlign: 'center',
                                }}
                            >
                                <CardMedia component="img" image={url || missingNo.src} alt={name}
                                           sx={{
                                               height: 150,
                                               width: '100%',
                                               objectFit: 'contain',
                                               mb: 1,
                                           }}
                                />
                                <Typography variant="body1" sx={{textTransform: 'capitalize'}}>
                                    {name}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
