"use client";

import React from "react";
import {
    Grid,
    Button,
    MenuItem,
    Select,
    Typography,
    SelectChangeEvent,
    Box
} from "@mui/material";
import { LessPokemonDetail } from "@/app/_utils/SinglePokemonInfo";
import PokemonCard from "@/app/_components/pokemon/PokemonCard";
import {ItemDetails} from "@/app/_utils/SingleItemInfo";
import ItemCard from "@/app/_components/item/ItemCard";

interface Props {
    elements: (LessPokemonDetail | ItemDetails)[];
    paginationModel: {
        page: number;
        pageSize: number;
    };
    onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
    hasNextPage: boolean;
    isLoading: boolean;
}

const DisplayGrid = ({
     elements,
     paginationModel,
     onPaginationModelChange,
     hasNextPage,
     isLoading,
}: Props) => {
    const {page, pageSize} = paginationModel;

    const handlePrev = () => {
        if (page > 0) {
            onPaginationModelChange({page: page - 1, pageSize});
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            onPaginationModelChange({page: page + 1, pageSize});
        }
    };

    const handlePageSizeChange = (event: SelectChangeEvent) => {
        onPaginationModelChange({page: 0, pageSize: Number(event.target.value)});
    };

    function isPokemon(el: unknown): el is LessPokemonDetail {
        return !!el && typeof el === "object" && "height" in el && "weight" in el;
    }

    function isItem(el: unknown): el is ItemDetails {
        return !!el && typeof el === "object" && "cost" in el;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">

            </div>

            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid container spacing={5} justifyContent="center">
                    {elements.map((element) => {
                        if (isPokemon(element)) {
                            return <PokemonCard key={element.id} pokemon={element}/>;
                        }
                        if (isItem(element)) {
                            return <ItemCard key={element.id} item={element}/>;
                        }
                        return null;
                    })}
                </Grid>
            )}
            <Box sx={{ display: "flex", margin: "2rem"}}>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "5rem" }}>
                    <Button onClick={handlePrev} disabled={page === 0} variant="outlined" sx={{ height: "3rem" }}>
                        Previous
                    </Button>
                    <Typography>Page {page + 1}</Typography>
                    <Button onClick={handleNext} disabled={!hasNextPage} variant="outlined" sx={{ height: "3rem" }}>
                        Next
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                </Box>
            </Box>
        </div>
    );
};

export default DisplayGrid;
