import { api } from './client';
import {PokemonListResponse} from "./customTypes/PokemonList";
import {allPokemonDetail} from "./customTypes/SinglePokemonInfo";

// get a pokemon list
export const getPokemonList = async (offset : number, limit : number): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>('pokemon', {
        params: { offset, limit },
    });
    return response.data;
};

//get single pokemon info
export const getAllPokemonDetail = async (name: string): Promise<allPokemonDetail> => {
    const response = await api.get<allPokemonDetail>(`pokemon/${name}`);
    return response.data;
};

//get a pokemon detailed list
export const getDetailedPokemonList = async (
    offset : number,
    limit : number,
): Promise<allPokemonDetail[]> => {
    const list = await getPokemonList(offset, limit);
    const details = await Promise.all(
        list.results.map((p) => getAllPokemonDetail(p.name))
    );
    console.log(details);
    return details;
};