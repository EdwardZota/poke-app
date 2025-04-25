"use client";

import React, {useEffect, useRef, useState} from "react";
import { getLessDetailedPokemonList } from "@/app/_services/pokemonApi";
import { lessPokemonDetail } from "@/app/_services/customTypes/SinglePokemonInfo";
import { Button } from "@mui/material";
import DisplayList from "@/app/_components/DisplayList";
import PokemonGrid from "@/app/_components/DisplayGrid";

const PokemonItems = () => {
    const [pokemon, setPokemon] = useState<lessPokemonDetail[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const allPokemonRef = useRef<lessPokemonDetail[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const offset = paginationModel.page * paginationModel.pageSize;
            const limit = paginationModel.pageSize;

            try {
                if (allPokemonRef.current) {
                    const pagedData = allPokemonRef.current.slice(offset, offset + limit);
                    setPokemon(pagedData);
                    setHasNextPage(offset + limit < allPokemonRef.current.length);
                } else {
                    const data = await getLessDetailedPokemonList(offset, limit);
                    setPokemon(data);
                    setHasNextPage(data.length === limit);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [paginationModel]);

    useEffect(() => {
        const prefetchAllPokemon = async () => {
            const chunkSize = 100;
            const total = 1500;
            const all: lessPokemonDetail[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getLessDetailedPokemonList(offset, chunkSize);
                    all.push(...chunk);
                    allPokemonRef.current = [...all];
                } catch (e) {
                    console.error(`Error in the  chunk ${offset}`, e);
                    break;
                }
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        prefetchAllPokemon();
    }, []);

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
                    elements={pokemon}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            ) : (
                <DisplayList
                    elements={pokemon}
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
