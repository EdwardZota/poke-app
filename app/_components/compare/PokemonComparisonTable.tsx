'use client';
import React, {useEffect, useState} from 'react';
import {
    AllPokemonDetail,
    PokemonEncounter
} from "@/app/_utils/SinglePokemonInfo";
import {
    Button,
    List, ListItem, ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import PokemonCard from "@/app/_components/pokemon/PokemonCard";
import {getPokemonEncounter} from "@/app/_services/pokemonApi";
import Typography from "@mui/material/Typography";

interface Props {
    selectedPokemon: AllPokemonDetail[];
    onRemove: (name: string) => void;
}

const PokemonComparisonTable: React.FC<Props> = ({ selectedPokemon, onRemove }) => {
    if (selectedPokemon.length === 0) return null;
    const [encounterData, setEncounterData] = useState<Map<string, PokemonEncounter[]>>(new Map());

    useEffect(() => {
        const fetchData = async () => {
            const newEncounterData = new Map<string, PokemonEncounter[]>();
            for (const pokemon of selectedPokemon) {
                const result= await getPokemonEncounter(pokemon.location_area_encounters)
                newEncounterData.set(pokemon.name, result.data);
            }
            setEncounterData(newEncounterData);
        };

        fetchData();
    }, [selectedPokemon]);
    const rows = [
        { label: "Name", getValue: (p: AllPokemonDetail) => p.name },
        { label: "Height", getValue: (p: AllPokemonDetail) => p.height },
        { label: "Weight", getValue: (p: AllPokemonDetail) => p.weight },
        {
            label: "Types",
            getValue: (p: AllPokemonDetail) =>
                p.types.map((t) => t.type.name).join(", "),
        },
        {
            label: "Abilities",
            getValue: (p: AllPokemonDetail) =>
                p.abilities.map((a) => a.ability.name).join(", "),
        },
        {
            label: "Base Experience",
            getValue: (p: AllPokemonDetail) => p.base_experience,
        },
        {
            label: "Stats",
            getValue: (p: AllPokemonDetail) => (
                <List dense>
                    {p.stats.map((s) => (
                        <ListItem key={s.stat.name} disablePadding>
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        <strong className="capitalize">{s.stat.name}</strong>: {s.base_stat}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ),
        },
        {
            label: "Location Encounters",
            getValue: (p: AllPokemonDetail) => {
                const pokemonEncounters = encounterData.get(p.name)
                if (!pokemonEncounters) return null;
                return (<List dense>
                        {pokemonEncounters.map((encounter, index) => (
                            <ListItem key={index} alignItems="flex-start" divider>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Location: {encounter.location_area.name}
                                        </Typography>
                                    }
                                    secondary={
                                        encounter.version_details.map((version, idx) => (
                                            <Typography
                                                key={idx}
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ display: "block", ml: 1 }}
                                            >
                                                Version: <strong>{version.version.name}</strong>, Max Chance: <strong>{version.max_chance}</strong>
                                            </Typography>
                                        ))
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                );
            },
        },
        {
            label: "Voice",
            getValue: (p: AllPokemonDetail) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {new Audio(p.cries.latest).play()}}
                >
                    Play Voice
                </Button>
            ),
        },
    ];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="font-bold" align={"center"} sx={{ verticalAlign: "top" }}>Attribute</TableCell>
                    {selectedPokemon.map((p) => (
                        <TableCell key={p.name}>
                            <div className="flex flex-col items-center">
                                <Button
                                    onClick={() => onRemove(p.name)}
                                    color="error"
                                    size="small"
                                >
                                    Remove
                                </Button>
                                <span className="capitalize font-semibold">{p.name}</span>
                                <PokemonCard key={p.name} pokemon={p}/>

                            </div>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.label}>
                        <TableCell className="font-semibold" align={"center"} sx={{ verticalAlign: "top" }}>{row.label}</TableCell>
                        {selectedPokemon.map((p) => (
                            <TableCell key={p.name + "-" + row.label}>
                                {row.getValue(p)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    );
};

export default PokemonComparisonTable;
