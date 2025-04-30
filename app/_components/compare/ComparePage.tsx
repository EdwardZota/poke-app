'use client';
import React, {useEffect, useState} from "react";
import {allPokemonDetail} from "@/app/_services/customTypes/SinglePokemonInfo";
import SearchBar from "@/app/_components/SearchBar";
import {getAllDetailedPokemonList} from "@/app/_services/pokemonApi";
import PokemonComparisonTable
    from "@/app/_components/compare/PokemonComparisonTable";
import {Typography} from "@mui/material";


export default function ComparePage() {
    const [selectedPokemon, setSelectedPokemon] = useState<allPokemonDetail[]>([]);
    const [allPokemonList, setAllPokemonList] = useState<allPokemonDetail[]>([]);

    useEffect(() => {
        const prefetchAllPokemon = async () => {
            const chunkSize = 100;
            const total = 1500;
            const all: allPokemonDetail[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getAllDetailedPokemonList(offset, chunkSize);
                    all.push(...chunk);
                    setAllPokemonList([...all])
                } catch (e) {
                    console.error(`Error in the chunk ${offset}`, e);
                    break;
                }
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        prefetchAllPokemon();
    }, []);

    const handleSelect = (pokemon: allPokemonDetail) => {
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
