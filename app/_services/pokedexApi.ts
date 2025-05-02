import {api} from './client';
import {ListResponse} from "@/app/_utils/ListResponse";
import {NameAndUrl} from "@/app/_utils/NameAndUrl";


const resource = 'pokedex';

// total is 20 (updated 24.04.2025)
// get pokedex list
export const getPokedexList = async () => {
    const response = await api.get<ListResponse>(resource);
    return response.data.results.map((pokedex: NameAndUrl) => pokedex.name);
};