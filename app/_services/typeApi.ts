import {api} from './client';
import {NameAndUrl} from "@/app/_utils/NameAndUrl";
import {ListResponse} from "@/app/_utils/ListResponse";


const resource = 'type';

// total is 21 (updated 24.04.2025)
// get type list
export const getTypeList = async () => {
    const response = await api.get<ListResponse>(resource);
    return response.data.results.map((type: NameAndUrl) => type.name);
};