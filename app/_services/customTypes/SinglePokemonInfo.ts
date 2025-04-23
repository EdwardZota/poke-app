export type allPokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    species: pokemonSpecies;
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

}

export type muchPokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    species: pokemonSpecies;
    types: pokemonTyps[];

}

export type pokemonAbilities = {
    ability: {
        name: string; // "limber"
        url: string; //"https://pokeapi.co/api/v2/ability/7/"
    };
}

export type pokemonGameIndex = {
    game_index: number;
    version: {
        name: string; //"red"
        url: string; //"https://pokeapi.co/api/v2/version/2/"
    }
}

export type pokemonTyps = {
    type: {
        name: string;
    };
}

export type pokemonSpecies = {
    name:string;
    url: string; // "https://pokeapi.co/api/v2/pokemon-species/132/"
}

export type pokemonStats = {
    base_stat: number;
    effort: number;
    stat: {
        name: string; // hp
        url: string; // "https://pokeapi.co/api/v2/stat/1/"
    }
}

export type pokemonSprites = {  // svg picture
    other: {
        dream_world: {
            front_default: string;
            front_female: string | null;
        }
    }
}