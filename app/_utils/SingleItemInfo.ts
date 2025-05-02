import {NameAndUrl} from "@/app/_utils/NameAndUrl";

export interface ItemDetails {
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
}

export interface HeldByPokemon {
    pokemon: NameAndUrl;
    version_details: VersionDetails[];
}

export interface VersionDetails {
    rarity: number;
    version: NameAndUrl;
}

export interface ItemEffectEntry {
    effect: string;
    short_effect: string;
    language: NameAndUrl;
}

export interface ItemFlavorTextEntry {
    text: string;
    language: NameAndUrl;
    version_group: NameAndUrl;
}

export interface ItemGameIndex {
    game_index: number;
    generation: NameAndUrl;
}

export interface ItemName {
    name: string;
    language: NameAndUrl;
}

export interface ItemSprites {
    default: string;
}
