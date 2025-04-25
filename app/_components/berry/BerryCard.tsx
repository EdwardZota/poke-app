import React from "react";
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import Link from "next/link";

type Props = {
    berry: berryDetails;
};

const BerryCard = ({ berry }: Props) => {
    return (
        <Link href={`/berry/${berry.name}`}>
            <div className="bg-white rounded-2xl shadow-md p-4 text-center">
                <h2 className="text-lg font-semibold mt-2 capitalize">{berry.name}</h2>
                <p className="text-sm text-gray-600">ID: {berry.id}</p>
                <p className="text-sm text-gray-600">Growth Time: {berry.growth_time}</p>
                <p className="text-sm text-gray-600">Size: {berry.size}</p>
                <p className="text-sm text-gray-600">Max Harvest: {berry.max_harvest}</p>
            </div>
        </Link>
    );
};

export default BerryCard;
