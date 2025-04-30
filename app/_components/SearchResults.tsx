import React from 'react';
import {
    allPokemonDetail,
    lessPokemonDetail
} from "@/app/_services/customTypes/SinglePokemonInfo";
import {Typography} from '@mui/material';
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import Link from "next/link";

interface SearchResultsProps {
    results: (lessPokemonDetail | berryDetails | itemDetails)[];
    typology: string;
    onSelectElement?: (element: allPokemonDetail ) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({results,typology,onSelectElement}) => {

    return (
        <div>
            {results.length === 0 ? (
                <Typography>No results found</Typography>
            ) : (
                results.map((result) =>
                    typology === "pokemon-compare" ? (
                        <Typography
                            key={result.name}
                            variant="h6"
                            className="cursor-pointer capitalize"
                            onClick={() => onSelectElement?.(result as allPokemonDetail)}
                        >
                            {result.name}
                        </Typography>
                    ) : (
                        <Link key={result.name} href={`/${typology}/${result.name}`}>
                            <Typography variant="h6">{result.name}</Typography>
                        </Link>
                    )
                )
            )}
        </div>
    );
};

export default SearchResults;
