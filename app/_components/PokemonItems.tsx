"use client";

import React, { useEffect, useState } from "react";
import { getLessDetailedPokemonList } from "@/app/_services/pokemonApi";
import { lessPokemonDetail } from "@/app/_services/customTypes/SinglePokemonInfo";
import { Button } from "@mui/material";
import ListedElements from "@/app/_components/ListedElements";
import PokemonGrid from "@/app/_components/PokemonGrid";

const PokemonItems = () => {
    const [pokemon, setPokemon] = useState<lessPokemonDetail[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridView, setIsGridView] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const offset = paginationModel.page * paginationModel.pageSize;
            const limit = paginationModel.pageSize;

            try {
                const data = await getLessDetailedPokemonList(offset, limit);
                setPokemon(data);
                setHasNextPage(data.length === limit);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [paginationModel]);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsGridView((prev) => !prev)}
                sx={{ marginBottom: "20px" }}
            >
                Toggle View
            </Button>

            {isGridView ? (
                <PokemonGrid
                    pokemonList={pokemon}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            ) : (
                <ListedElements
                    rows={pokemon}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default PokemonItems;
