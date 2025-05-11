'use client';

import {
    Typography, Box, CardMedia, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import { ItemDetails } from "@/app/_utils/SingleItemInfo";
import React from "react";

interface Props {
    item: ItemDetails;
}

export default function ItemDetail({ item }: Props) {
    const englishEffect = item.effect_entries.find(e => e.language.name === 'en');
    const englishFlavor = item.flavor_text_entries.find(f => f.language.name === 'en');
    const staticFields = [
        { label: "Id", value: item.id },
        { label: "Cost", value: item.cost },
        { label: "Fling power", value: item.fling_power },
        { label: "Category", value: item.category.name },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{
                display: "flex", flexDirection: "row",
                marginTop: "2rem",
                textTransform: "capitalize",
                alignItems: "center"
            }}>
                <Typography variant="h3" component="h1">
                    {item.name}
                </Typography>

                <Box sx={{ display: "flex", paddingLeft: "2rem" }}>
                    <CardMedia
                        component="img"
                        image={item.sprites.default}
                        alt={item.name}
                        sx={{ objectFit: 'contain', height: '5rem', width: "5rem" }}
                    />
                </Box>
            </Box>

            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: "3rem" }}>
                    <TableContainer sx={{ width: "40rem" }} component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "lightgrey" }}>
                                <TableRow>
                                    <TableCell sx={{ width: "7.5rem" }}>Stat Name</TableCell>
                                    <TableCell sx={{ width: "5rem" }} align="center">Base Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staticFields.map((field, idx) => (
                                    <TableRow key={`static-${idx}`}>
                                        <TableCell sx={{ textTransform: "capitalize" }}>{field.label}</TableCell>
                                        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                            {field.value}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{pl: "5rem"}}>
                    <Box sx={{ paddingTop: "2rem" }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Attributes
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <ul style={{ paddingLeft: '2rem', fontSize: '1.25em', listStyleType: 'disc', margin: 0 }}>
                                {item.attributes.map(attr => (
                                    <li key={attr.name}>
                                        {attr.name
                                            .split(' ')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                            .join('')}
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>

                    <Box sx={{ paddingTop: "2rem" }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Effect
                        </Typography>
                        <Box sx={{ mb: 3, ml: 2 }}>
                            {englishEffect && (
                                <>
                                    <Typography sx={{ fontSize: '1.25em' }} variant="body1">
                                        {englishEffect.effect}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ paddingTop: "2rem" }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Flavor
                        </Typography>
                        <Box sx={{ mb: 3, ml: 2 }}>
                            {englishFlavor && (
                                <>
                                    <Typography sx={{ fontSize: '1.25em' }} variant="body1">
                                        {englishFlavor.text}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>

                    {item.held_by_pokemon && item.held_by_pokemon.length > 0 && (
                        <Box sx={{ paddingTop: "2rem" }}>
                            <Typography variant="h4" sx={{ mb: 2 }}>
                                Held by Pokémon
                            </Typography>
                            <Box sx={{ mb: 3, ml: 2 }}>
                                {englishFlavor && (
                                    <Typography variant="body1">
                                        {item.held_by_pokemon.map(p => p.pokemon.name).join(', ')}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
