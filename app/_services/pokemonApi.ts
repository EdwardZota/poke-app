import {api} from './client';
import {PokemonListResponse} from "./customTypes/PokemonList";
import {
    allPokemonDetail,
    lessPokemonDetail
} from "./customTypes/SinglePokemonInfo";

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

//get a few single pokemon info
export const getLessPokemonDetail = async (name: string): Promise<lessPokemonDetail> => {
    const response = await api.get<lessPokemonDetail>(`pokemon/${name}`);
    return response.data;
};


//get a pokemon detailed list
export const getAllDetailedPokemonList = async (
    offset : number,
    limit : number,
): Promise<allPokemonDetail[]> => {
    const list = await getPokemonList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getAllPokemonDetail(p.name))
    );
};

//get a few pokemon detailed list
export const getLessDetailedPokemonList = async (
    offset : number,
    limit : number,
): Promise<lessPokemonDetail[]> => {
    const list = await getPokemonList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getLessPokemonDetail(p.name))
    );
};