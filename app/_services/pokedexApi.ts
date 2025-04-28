import {api} from './client';
import {ListResponse} from "@/app/_services/customTypes/PokemonList";
import {nameAndUrl} from "@/app/_services/customTypes/nameAndUrl";


const resource = 'pokedex';

// total is 20 (updated 24.04.2025)
// get pokedex list
export const getPokedexList = async () => {
    const response = await api.get<ListResponse>(resource);
    return response.data.results.map((pokedex: nameAndUrl) => pokedex.name);
};