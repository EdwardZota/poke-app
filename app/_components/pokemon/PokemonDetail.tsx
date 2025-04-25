'use client';

import {
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {allPokemonDetail} from "@/app/_services/customTypes/SinglePokemonInfo";

type Props = {
    pokemon: allPokemonDetail;
};

export default function PokemonDetail({pokemon}: Props) {
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
                        {pokemon.game_indices.map((g ) => g.version.name).join(', ')}
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
                </div>
            </Grid>
        </div>
    );
}
