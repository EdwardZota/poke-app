import {nameAndUrl} from "@/app/_services/customTypes/nameAndUrl";

export type itemDetails = {
    id: number;
    name: string;
    cost: number;
    fling_power: number;
    fling_effect: nameAndUrl;
    attributes: nameAndUrl[];
    category: nameAndUrl;
    effect_entries: ItemEffectEntry[];
    flavor_text_entries: ItemFlavorTextEntry[];
    game_indices: ItemGameIndex[];
    names: ItemName[];
    sprites: ItemSprites;
    held_by_pokemon: HeldByPokemon[];
};

export type HeldByPokemon = {
    pokemon: nameAndUrl;
    version_details: VersionDetails[];
}

export type VersionDetails = {
    rarity: number;
    version: nameAndUrl;
}

export type ItemEffectEntry = {
    effect: string;
    short_effect: string;
    language: nameAndUrl;
};

export type ItemFlavorTextEntry = {
    text: string;
    language: nameAndUrl;
    version_group: nameAndUrl;
};

export type ItemGameIndex = {
    game_index: number;
    generation: nameAndUrl;
};

export type ItemName = {
    name: string;
    language: nameAndUrl;
};

export type ItemSprites = {
    default: string;
};
