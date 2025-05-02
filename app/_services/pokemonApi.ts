import {api} from './client';
import {ListResponse} from "../_utils/ListResponse";
import {
    AbilityDetail,
    AllPokemonDetail,
    LessPokemonDetail, PokemonEncounter,
    PokemonEvolution, PokemonSpeciesDetails
} from "../_utils/SinglePokemonInfo";

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
export const getAllPokemonDetail = async (name: string): Promise<AllPokemonDetail> => {
    const response = await api.get<AllPokemonDetail>(`${resource}/${name}`);
    return response.data;
};

//get a few single pokemon info
export const getLessPokemonDetail = async (name: string): Promise<LessPokemonDetail> => {
    const response = await api.get<LessPokemonDetail>(`${resource}/${name}`);
    return response.data;
};


//get a pokemon detailed list
export const getAllDetailedPokemonList = async (
    offset : number,
    limit : number,
): Promise<AllPokemonDetail[]> => {
    const list = await getPokemonList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getAllPokemonDetail(p.name))
    );
};

//get a few pokemon detailed list
export const getLessDetailedPokemonList = async (
    offset : number,
    limit : number,
): Promise<LessPokemonDetail[]> => {
    const list = await getPokemonList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getLessPokemonDetail(p.name))
    );
};

//get ability info
export const getAbilityInfo = async (abilityId: number): Promise<AbilityDetail> => {
    const response = await api.get<AbilityDetail>(`ability/${abilityId}`);
    return response.data;
}

//get single pokemon evolution
export const getPokemonEvolution = async (
    name : string,
) => {
    const pokemonSpecies:PokemonSpeciesDetails = await getSpecies(name);
    const idEvolution = extractIdFromUrl(pokemonSpecies.evolution_chain.url,"evolution");
    return api.get<PokemonEvolution>(`evolution-chain/${idEvolution}`)
};

//get pokemon encounter
export const getPokemonEncounter = async (
    url : string,
) => {
    const idEncounter = extractIdFromUrl(url,"encounter");
    return api.get<PokemonEncounter[]>(`${resource}/${idEncounter}/encounters`)
};

//get pokemon species
export const getSpecies = async (name: string)=> {
    const response = await api.get<PokemonSpeciesDetails>(`${resource}-species/${name}`);
    return response.data;
};


function extractIdFromUrl(url: string, type: string): number {
    let matches: RegExpExecArray | null = null;
    if (type === "evolution") {
        const regex = /\/(\d+)\/$/;
        matches = regex.exec(url);
    } else if (type === "encounter") {
        const regex = /\/pokemon\/(\d+)\//;
        matches = regex.exec(url);
    }

    return matches ? parseInt(matches[1], 10) : -1;
}