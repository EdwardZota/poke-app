'use client';
import React, {useEffect, useState} from "react";
import {AllPokemonDetail} from "@/app/_utils/SinglePokemonInfo";
import SearchBar from "@/app/_components/searchbar/SearchBar";
import {getAllDetailedPokemonList} from "@/app/_services/pokemonApi";
import PokemonComparisonTable
    from "@/app/_components/compare/PokemonComparisonTable";
import {Box, Typography, Paper} from "@mui/material";
import {toast} from "react-toastify";
import {AxiosError} from "axios";


export default function ComparePage() {
    const [selectedPokemon, setSelectedPokemon] = useState<AllPokemonDetail[]>([]);
    const [allPokemonList, setAllPokemonList] = useState<AllPokemonDetail[]>([]);

    useEffect(() => {
        const prefetchAllPokemon = async () => {
            const chunkSize = 100;
            const total = 1500;
            const all: AllPokemonDetail[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getAllDetailedPokemonList(offset, chunkSize);
                    all.push(...chunk);
                    setAllPokemonList([...all])
                } catch (error) {
                    if (error instanceof AxiosError) {
                        toast.error(`Error: ${error.response?.data.message}`);
                    }
                    break;
                }
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        prefetchAllPokemon();
    }, []);

    const handleSelect = (pokemon: AllPokemonDetail) => {
        if (selectedPokemon.find(p => p.name === pokemon.name) || selectedPokemon.length >= 4) return;
        setSelectedPokemon(prev => [...prev, pokemon]);
    };

    const handleRemove = (name: string) => {
        setSelectedPokemon(prev => prev.filter(p => p.name !== name));
    };

    return (
        <div className="p-4">
            <Typography sx={{ fontSize: "3rem", fontWeight: "bold" }}>
                Compare Page
            </Typography>
            <SearchBar
                allElements={allPokemonList}
                typology="pokemon-compare"
                onSelectElement={handleSelect}
            />
            <div className="mt-6 overflow-x-auto">
                <PokemonComparisonTable
                    selectedPokemon={selectedPokemon}
                    onRemove={handleRemove}
                />
            </div>
        </div>
    );
}
