"use client";

import React from "react";
import {
    Grid,
    Button,
    MenuItem,
    Select,
    Typography,
    SelectChangeEvent
} from "@mui/material";
import { lessPokemonDetail } from "@/app/_services/customTypes/SinglePokemonInfo";
import PokemonCard from "@/app/_components/PokemonCard";

type Props = {
    pokemonList: lessPokemonDetail[];
    paginationModel: {
        page: number;
        pageSize: number;
    };
    onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
    hasNextPage: boolean;
    isLoading: boolean;
};

const PokemonGridWithPaginationControls = ({
   pokemonList,
   paginationModel,
   onPaginationModelChange,
   hasNextPage,
   isLoading,
}: Props) => {
    const { page, pageSize } = paginationModel;

    const handlePrev = () => {
        if (page > 0) {
            onPaginationModelChange({ page: page - 1, pageSize });
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            onPaginationModelChange({ page: page + 1, pageSize });
        }
    };

    const handlePageSizeChange = (event: SelectChangeEvent) => {
        onPaginationModelChange({ page: 0, pageSize: Number(event.target.value) });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" fontWeight="bold">
                    Pokémon List
                </Typography>

                <div className="flex items-center gap-2">
                    <Typography>Pokémon per page:</Typography>
                    <Select
                        size="small"
                        variant="outlined"
                        value={pageSize.toString()}
                        onChange={handlePageSizeChange}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {pokemonList.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </Grid>
            )}

            <div className="flex justify-between mt-4">
                <Button onClick={handlePrev} disabled={page === 0} variant="outlined">
                    Previous
                </Button>
                <Typography>
                    Page {page + 1}
                </Typography>
                <Button onClick={handleNext} disabled={!hasNextPage} variant="outlined">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PokemonGridWithPaginationControls;
