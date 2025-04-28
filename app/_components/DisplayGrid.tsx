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
import PokemonCard from "@/app/_components/pokemon/PokemonCard";
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import BerryCard from "@/app/_components/berry/BerryCard";
import ItemCard from "@/app/_components/item/ItemCard";

type Props = {
    elements: (lessPokemonDetail | berryDetails | itemDetails)[];
    paginationModel: {
        page: number;
        pageSize: number;
    };
    onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
    hasNextPage: boolean;
    isLoading: boolean;
};

const DisplayGrid = ({
   elements,
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

    function isPokemon(el: unknown): el is lessPokemonDetail {
        return !!el && typeof el === "object" && "height" in el && "weight" in el;
    }

    function isBerry(el: unknown): el is berryDetails {
        return !!el && typeof el === "object" && "flavors" in el;
    }

    function isItem(el: unknown): el is itemDetails {
        return !!el && typeof el === "object" && "cost" in el;
    }


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
                    {elements.map((element) => {
                        if (isPokemon(element)) {
                            return <PokemonCard key={element.id} pokemon={element} />;
                        }
                        if (isBerry(element)) {
                            return <BerryCard key={element.id} berry={element} />;
                        }
                        if (isItem(element)) {
                            return <ItemCard key={element.id} item={element} />;
                        }
                        return null;
                    })}
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

export default DisplayGrid;
