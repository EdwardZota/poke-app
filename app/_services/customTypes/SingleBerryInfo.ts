import {nameAndUrl} from "@/app/_services/customTypes/nameAndUrl";

export type berryDetails = {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: nameAndUrl;
    flavors: BerryFlavor[];
    item: nameAndUrl;
    natural_gift_type: nameAndUrl;
};


export type BerryFlavor = {
    potency: number;
    flavor: nameAndUrl
};
