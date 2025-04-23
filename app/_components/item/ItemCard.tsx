import React from "react";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import Link from "next/link";
import ImageNotAvailable from "@/app/_pictures/ImageNotAvailable.png";

type Props = {
    item: itemDetails;
};

const ItemCard = ({ item }: Props) => {
    return (
        <Link href={`/item/${item.name}`}>
            <div className="bg-white rounded-2xl shadow-md p-4 text-center">
                {item.sprites?.default && (
                    <img
                        src={item.sprites.default || ImageNotAvailable.src}
                        alt={item.name}
                        className="w-20 h-20 mx-auto"
                    />
                )}
                <h2 className="text-lg font-semibold mt-2 capitalize">{item.name}</h2>
                <p className="text-sm text-gray-600">ID: {item.id}</p>
                <p className="text-sm text-gray-600">Cost: {item.cost}</p>
                <p className="text-sm text-gray-600">
                    Category: {item.category.name}
                </p>
            </div>
        </Link>
    );
};

export default ItemCard;
