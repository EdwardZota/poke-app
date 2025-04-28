import {NameAndUrl} from "@/app/_services/customTypes/NameAndUrl";

export type allPokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    species: NameAndUrl;
    types: pokemonTyps[];
    abilities: pokemonAbilities[];
    game_indices: pokemonGameIndex[];
    stats: pokemonStats[];
};

export type lessPokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    types: pokemonTyps[];

}

export type muchPokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    species: NameAndUrl;
    types: pokemonTyps[];

}

export type pokemonAbilities = {
    ability: NameAndUrl
}

export type pokemonGameIndex = {
    game_index: number;
    version: NameAndUrl
}

export type pokemonTyps = {
    type: {
        name: string;
    };
}


export type pokemonStats = {
    base_stat: number;
    effort: number;
    stat: NameAndUrl
}

export type pokemonSprites = {  // svg picture
    other: {
        dream_world: {
            front_default: string;
            front_female: string | null;
        }
    }
}