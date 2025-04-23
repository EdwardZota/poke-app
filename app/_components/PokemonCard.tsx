import React from "react";
import {lessPokemonDetail} from "@/app/_services/customTypes/SinglePokemonInfo";
import Link from "next/link";

type Props = {
    pokemon: lessPokemonDetail;
};

const PokemonCard = ({ pokemon }: Props) => {
    return (
        <Link href={`/pokemon/${pokemon.name}`}>
            <div className="bg-white rounded-2xl shadow-md p-4 text-center">
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32 mx-auto"
                />
                <h2 className="text-lg font-semibold mt-2 capitalize">{pokemon.name}</h2>
                <p className="text-sm text-gray-600">ID: {pokemon.id}</p>
                <p className="text-sm text-gray-600">Height: {pokemon.height}</p>
                <p className="text-sm text-gray-600">Weight: {pokemon.weight}</p>
            </div>
        </Link>
    );
};

export default PokemonCard;
