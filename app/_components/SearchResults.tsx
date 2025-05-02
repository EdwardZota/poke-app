import React from 'react';
import {
    AllPokemonDetail,
    LessPokemonDetail
} from "@/app/_utils/SinglePokemonInfo";
import {Typography} from '@mui/material';
import {ItemDetails} from "@/app/_utils/SingleItemInfo";
import Link from "next/link";

interface SearchResultsProps {
    results: (LessPokemonDetail | ItemDetails)[];
    typology: string;
    onSelectElement?: (element: AllPokemonDetail ) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({results,typology,onSelectElement}) => {

    return (
        <div>
            {results.length === 0 ? (
                <Typography>No results found</Typography>
            ) : (
                results.map((result) =>{
                    if (typeof result.name !== 'string') return null;
                    if (typology === "pokemon-compare") {
                        return (
                            <Typography
                                key={result.name}
                                variant="h6"
                                className="cursor-pointer capitalize"
                                onClick={() => onSelectElement?.(result as AllPokemonDetail)}
                            >
                                {result.name}
                            </Typography>
                        );
                    } else {
                        return (
                            <Link key={result.name} href={`/${typology}/${result.name}`}>
                                <Typography variant="h6">{result.name}</Typography>
                            </Link>
                        );
                    }
                })
            )}
        </div>
    );
};

export default SearchResults;
