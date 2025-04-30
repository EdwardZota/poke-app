'use client';

import {
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {
    allPokemonDetail,
} from "@/app/_services/customTypes/SinglePokemonInfo";
import {
    getLessPokemonDetail,
    getPokemonEvolution
} from "@/app/_services/pokemonApi";
import {useEffect, useState} from "react";
import {nameAndUrl} from "@/app/_services/customTypes/nameAndUrl";
import missingNo from "@/app/_pictures/pokemonCardTemplate/missingNo.png"

type Props = {
    pokemon: allPokemonDetail;
};

export default function PokemonDetail({pokemon}: Props) {
    const [namePics, setNamePics] = useState<nameAndUrl[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const pokemonEvo = await getPokemonEvolution(pokemon.name);

            const extractNames = (chain: any): string[] =>
                [chain.species.name, ...chain.evolves_to.flatMap((e: any) => extractNames(e))];

            const names = extractNames(pokemonEvo.data.chain);

            const pics = await Promise.all(
                names.map(async (name: string) => {
                    const pokemonInfo = await getLessPokemonDetail(name);
                    return {
                        name: name,
                        url: pokemonInfo.sprites.other.dream_world.front_default
                    };
                })
            );

            setNamePics(pics);
        };
        
        fetchData();
    }, [pokemon.name]);

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <Typography variant="h3" component="h1"
                        className="text-center capitalize font-bold mb-6">
                {pokemon.name}
            </Typography>

            <div className="flex justify-center mb-6">
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    className="h-40"
                />
            </div>

            <Grid container spacing={4}>
                <div>
                    <Typography variant="body1" className="font-semibold">
                        ID: <span className="font-normal">{pokemon.id}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Order: <span
                        className="font-normal">{pokemon.order}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Height: <span
                        className="font-normal">{pokemon.height}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Weight: <span
                        className="font-normal">{pokemon.weight}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Species: <span
                        className="font-normal">{pokemon.species.name}</span>
                    </Typography>
                </div>

                <div>
                    <Typography variant="h6"
                                className="font-semibold mt-4">Types</Typography>
                    <Typography variant="body1">
                        {pokemon.types.map((t) => t.type.name).join(', ')}
                    </Typography>

                    <Typography variant="h6"
                                className="font-semibold mt-4">Abilities</Typography>
                    <Typography variant="body1">
                        {pokemon.abilities.map((a) => a.ability.name).join(', ')}
                    </Typography>

                    <Typography variant="h6" className="font-semibold mt-4">Game
                        Indices</Typography>
                    <Typography variant="body1">
                        {pokemon.game_indices.map((g) => g.version.name).join(', ')}
                    </Typography>

                    <Typography variant="h6"
                                className="font-semibold mt-4">Stats</Typography>
                    <List>
                        {pokemon.stats.map((s, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={`${s.stat.name}: ${s.base_stat} (Effort: ${s.effort})`}/>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h4">
                        Evolutions
                    </Typography>
                    <List>
                        {namePics.map(({ name, url }) => (
                            <div key={name}
                                 className="flex items-center space-x-4 my-2">
                                <img src={url || missingNo.src} alt={name}
                                     className="h-20 w-20 object-contain"/>
                                <Typography variant="body1"
                                            className="capitalize">
                                    {name}
                                </Typography>
                            </div>
                        ))}
                    </List>
                </div>
            </Grid>
        </div>
    );
}
