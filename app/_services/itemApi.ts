import {api} from './client';
import {ListResponse} from "@/app/_utils/ListResponse";
import {ItemDetails} from "@/app/_utils/SingleItemInfo";

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
export const getItemDetail = async (name : string): Promise<ItemDetails> => {
    const response = await api.get<ItemDetails>(`${resource}/${name}`);
    return response.data;
};


//get a berry detailed list
export const getAllDetailedItemList = async (
    offset : number,
    limit : number,
): Promise<ItemDetails[]> => {
    const list = await getItemList(offset, limit);
    return await Promise.all(
        list.results.map((p) => getItemDetail(p.name))
    );
};