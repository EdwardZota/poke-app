import {api} from './client';
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {ListResponse} from "@/app/_services/customTypes/PokemonList";

const resource = 'berry';

// total is 64 (updated 24.04.2025)
// get a berry list
export const getBerryList = async (offset : number, limit : number): Promise<ListResponse> => {
    const response = await api.get<ListResponse>(resource, {
        params: { offset, limit },
    });
    return response.data;
};

// get a single berry
export const getBerryDetail = async (name : string): Promise<berryDetails> => {
    const response = await api.get<berryDetails>(`${resource}/${name}`);
    return response.data;
};


//get a berry detailed list
export const getAllDetailedBerryList = async (
    offset : number,
    limit : number,
): Promise<berryDetails[]> => {
    const list = await getBerryList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getBerryDetail(p.name))
    );
};