'use client';

import {
    Typography,
    Grid,
} from '@mui/material';
import {ItemDetails} from "@/app/_utils/SingleItemInfo";

interface Props {
    item: ItemDetails;
}

export default function ItemDetail({item}: Props) {
    const englishEffect = item.effect_entries.find(e => e.language.name === 'en');
    const englishFlavor = item.flavor_text_entries.find(f => f.language.name === 'en');

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <Typography variant="h3" component="h1"
                        className="text-center capitalize font-bold mb-6">
                {item.name}
            </Typography>

            <div className="flex justify-center mb-6">
                <img
                    src={item.sprites.default}
                    alt={item.name}
                    className="h-40"
                />
            </div>

            <Grid container spacing={4}>
                <div>
                    <Typography variant="body1" className="font-semibold">
                        ID: <span className="font-normal">{item.id}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Cost: <span className="font-normal">{item.cost}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Fling Power: <span
                        className="font-normal">{item.fling_power}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Category: <span
                        className="font-normal">{item.category.name}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Attributes: <span className="font-normal">
                        {item.attributes.map(attr => attr.name).join(', ')}
                    </span>
                    </Typography>
                </div>

                <div>
                    {englishEffect && (
                        <>
                            <Typography variant="h6"
                                        className="font-semibold mt-4">Effect</Typography>
                            <Typography
                                variant="body1">{englishEffect.effect}</Typography>
                        </>
                    )}

                    {englishFlavor && (
                        <>
                            <Typography variant="h6"
                                        className="font-semibold mt-4">Flavor
                                Text</Typography>
                            <Typography
                                variant="body1">{englishFlavor.text}</Typography>
                        </>
                    )}

                    <Typography variant="h6" className="font-semibold mt-4">Held
                        by Pokémon</Typography>
                    <Typography variant="body1">
                        {item.held_by_pokemon.length > 0
                            ? item.held_by_pokemon.map(p => p.pokemon.name).join(', ')
                            : 'None'}
                    </Typography>
                </div>
            </Grid>
        </div>
    );
}
