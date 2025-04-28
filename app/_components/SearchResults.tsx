import React from 'react';
import {lessPokemonDetail} from "@/app/_services/customTypes/SinglePokemonInfo";
import {Typography} from '@mui/material';
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import Link from "next/link";

interface SearchResultsProps {
    results: (lessPokemonDetail | berryDetails | itemDetails)[];
    typology: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({results,typology}) => {

    return (
        <div>
            {results.length === 0 ? (
                <Typography>No results found</Typography>
            ) : (
                results.map((result) => (
                    <Link href={`/${typology}/${result.name}`}>
                        <Typography variant="h6">{result.name}</Typography>
                    </Link>
                ))
            )}
        </div>
    );
};

export default SearchResults;
