import {api} from './client';
import {ListResponse} from "./customTypes/PokemonList";
import {
    abilityDetail,
    allPokemonDetail,
    lessPokemonDetail, pokemonEncounter,
    pokemonEvolution
} from "./customTypes/SinglePokemonInfo";

const resource = 'pokemon';

// total is 1302 (updated 24.04.2025)
// get a pokemon list
export const getPokemonList = async (offset : number, limit : number): Promise<ListResponse> => {
    const response = await api.get<ListResponse>(resource, {
        params: { offset, limit },
    });
    return response.data;
};

//get single pokemon info
export const getAllPokemonDetail = async (name: string): Promise<allPokemonDetail> => {
    const response = await api.get<allPokemonDetail>(`${resource}/${name}`);
    return response.data;
};

//get a few single pokemon info
export const getLessPokemonDetail = async (name: string): Promise<lessPokemonDetail> => {
    const response = await api.get<lessPokemonDetail>(`${resource}/${name}`);
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

//get ability info
export const getAbilityInfo = async (abilityId: number): Promise<abilityDetail> => {
    const response = await api.get<abilityDetail>(`ability/${abilityId}`);
    return response.data;
}

//get single pokemon evolution
export const getPokemonEvolution = async (
    name : string,
) => {
    const pokemonSpecies = await getSpecies(name);
    const idEvolution = extractIdFromUrl(pokemonSpecies.evolution_chain.url,"evolution");
    return api.get<pokemonEvolution>(`evolution-chain/${idEvolution}`)
};

//get pokemon encounter
export const getPokemonEncounter = async (
    url : string,
) => {
    const idEncounter = extractIdFromUrl(url,"encounter");
    return api.get<pokemonEncounter[]>(`${resource}/${idEncounter}/encounters`)
};

//get pokemon species
export const getSpecies = async (name: string)=> {
    const response = await api.get<any>(`${resource}-species/${name}`);
    return response.data;
};


function extractIdFromUrl(url: string, type: string): number {
    let matches: RegExpMatchArray | null = null;
    if (type === "evolution") {
        matches = url.match(/\/(\d+)\/$/);
    } else if (type === "encounter") {
        matches = url.match(/\/pokemon\/(\d+)\//);
    }

    return matches ? parseInt(matches[1], 10) : -1;
}