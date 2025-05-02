import {NameAndUrl} from "@/app/_utils/NameAndUrl";

export interface AllPokemonDetail {
    id: number;
    name: string;
    base_experience:string;
    height: number;
    weight: number;
    order: number;
    sprites: PokemonSprites;
    species: NameAndUrl;
    types: PokemonTypes[];
    abilities: PokemonAbilities[];
    game_indices: PokemonGameIndex[];
    stats: PokemonStats[];
    location_area_encounters:string;
    cries: Cries;
}

export interface LessPokemonDetail {
    id: number;
    name: string;
    order: number;
    sprites: PokemonSprites;
    stats: PokemonStats[];
    types: PokemonTypes[];
    abilities: PokemonAbilities[];
}

export interface PokemonAbilities {
    ability: NameAndUrl
}

export interface PokemonGameIndex {
    game_index: number;
    version: NameAndUrl
}

export interface PokemonTypes {
    type: {
        name: string;
    };
}


export interface PokemonStats {
    base_stat: number;
    effort: number;
    stat: NameAndUrl
}

export interface PokemonSprites {
    other: {
        dream_world: {
            front_default: string;
            front_female: string;
        }
    }
}

export interface Cries {
    latest: string;
    legacy: string;
}


export interface EvolutionChain {
    evolves_to: EvolutionChain[];
    species: NameAndUrl;
}

export interface PokemonEvolution {
    id: number;
    chain: EvolutionChain;
}


export interface AbilityDetail {
    id: number;
    name: string;
    effect_entries: {
        effect: string;
        short_effect: string;
        language: { name: string };
    }[];
}

export interface AbilityInfo {
    id: number;
    name: string;
    effect_entries: {
        effect: string;
        short_effect: string;
        language: { name: string };
    }[];
}

export interface PokemonEncounter {
    location_area: NameAndUrl;
    version_details: EncounterVersionDetails[]
}

export interface EncounterVersionDetails {
    max_chance: number;
    version: NameAndUrl;
}

export interface PokemonSpeciesDetails {
    evolution_chain: {
        url: string;
    };
}