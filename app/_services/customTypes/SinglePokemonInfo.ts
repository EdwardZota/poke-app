import {nameAndUrl} from "@/app/_services/customTypes/nameAndUrl";

export type allPokemonDetail = {
    id: number;
    name: string;
    base_experience:string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    species: nameAndUrl;
    types: pokemonTypes[];
    abilities: pokemonAbilities[];
    game_indices: pokemonGameIndex[];
    stats: pokemonStats[];
    location_area_encounters:string;// "/api/v2/pokemon/35/encounters"
    cries: cries;
};

export type lessPokemonDetail = {
    id: number;
    name: string;
    order: number;
    sprites: pokemonSprites;
    stats: pokemonStats[];
    types: pokemonTypes[];
    abilities: pokemonAbilities[];
}

export type muchPokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    sprites: pokemonSprites;
    species: nameAndUrl;
    types: pokemonTypes[];

}

export type pokemonAbilities = {
    ability: nameAndUrl
}

export type pokemonGameIndex = {
    game_index: number;
    version: nameAndUrl
}

export type pokemonTypes = {
    type: {
        name: string;
    };
}


export type pokemonStats = {
    base_stat: number;
    effort: number;
    stat: nameAndUrl
}

export type pokemonSprites = {
    other: {
        dream_world: {
            front_default: string;
            front_female: string | null;
        }
    }
}

export type cries = {
    latest: string;
    legacy: string;
}


export type evolutionChain = {
    evolves_to: evolutionChain[];
    species: nameAndUrl;
};

export type pokemonEvolution = {
    id: number;
    chain: evolutionChain;
};


export type abilityDetail = {
    id: number;
    name: string;
    effect_entries: {
        effect: string;
        short_effect: string;
        language: { name: string };
    }[];
};

export type abilityInfo = {
    id: number;
    name: string;
    effect_entries: {
        effect: string;
        short_effect: string;
        language: { name: string };
    }[];
};

export type pokemonEncounter = {
    location_area: nameAndUrl;
    version_details: encounterVersionDetails[]
}

export type encounterVersionDetails = {
    max_chance: number;
    version: nameAndUrl;
}
