import {NameAndUrl} from "@/app/_services/customTypes/NameAndUrl";

export type itemDetails = {
    id: number;
    name: string;
    cost: number;
    fling_power: number;
    fling_effect: NameAndUrl;
    attributes: NameAndUrl[];
    category: NameAndUrl;
    effect_entries: ItemEffectEntry[];
    flavor_text_entries: ItemFlavorTextEntry[];
    game_indices: ItemGameIndex[];
    names: ItemName[];
    sprites: ItemSprites;
    held_by_pokemon: HeldByPokemon[];
};

export type HeldByPokemon = {
    pokemon: NameAndUrl;
    version_details: VersionDetails[];
}

export type VersionDetails = {
    rarity: number;
    version: NameAndUrl;
}

export type ItemEffectEntry = {
    effect: string;
    short_effect: string;
    language: NameAndUrl;
};

export type ItemFlavorTextEntry = {
    text: string;
    language: NameAndUrl;
    version_group: NameAndUrl;
};

export type ItemGameIndex = {
    game_index: number;
    generation: NameAndUrl;
};

export type ItemName = {
    name: string;
    language: NameAndUrl;
};

export type ItemSprites = {
    default: string;
};
