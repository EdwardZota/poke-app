import {api} from './client';
import {ListResponse} from "@/app/_services/customTypes/PokemonList";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";

const resource = 'item';

// total is 2180 (updated 24.04.2025)
// get a berry list
export const getItemList = async (offset : number, limit : number): Promise<ListResponse> => {
    const response = await api.get<ListResponse>(resource, {
        params: { offset, limit },
    });
    return response.data;
};

// get a single berry
export const getItemDetail = async (name : string): Promise<itemDetails> => {
    const response = await api.get<itemDetails>(`${resource}/${name}`);
    return response.data;
};


//get a berry detailed list
export const getAllDetailedItemList = async (
    offset : number,
    limit : number,
): Promise<itemDetails[]> => {
    const list = await getItemList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getItemDetail(p.name))
    );
};