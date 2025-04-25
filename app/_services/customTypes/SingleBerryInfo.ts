import {NameAndUrl} from "@/app/_services/customTypes/NameAndUrl";

export type berryDetails = {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: NameAndUrl;
    flavors: BerryFlavor[];
    item: NameAndUrl;
    natural_gift_type: NameAndUrl;
};


export type BerryFlavor = {
    potency: number;
    flavor: NameAndUrl
};
