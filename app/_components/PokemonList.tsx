"use client";

import React, { useEffect, useState } from "react";
import { getDetailedPokemonList } from "@/app/_services/pokemonApi";
import { allPokemonDetail } from "@/app/_services/customTypes/SinglePokemonInfo";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState<allPokemonDetail[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 6;

    useEffect(() => {
        getDetailedPokemonList(offset, limit)
            .then(setPokemon)
            .catch(console.error);
    }, [offset]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Pokémon List</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemon.map((p) => (
                    <div
                        key={p.id}
                        className="border p-4 rounded shadow text-center bg-white"
                    >
                        <img
                            src={p.sprites.other.dream_world.front_default}
                            alt={p.name}
                            className="mx-auto mb-2"
                        />
                        <h2 className="capitalize font-semibold">{p.name}</h2>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                    disabled={offset === 0}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => setOffset((prev) => prev + limit)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
