import React from 'react';
import {
    AllPokemonDetail,
    LessPokemonDetail
} from "@/app/_utils/SinglePokemonInfo";
import {Box, CardMedia, Typography} from '@mui/material';
import {ItemDetails} from "@/app/_utils/SingleItemInfo";
import Link from "next/link";
import missingNo from "@/app/_pictures/pokemonCardTemplate/missingNo.png";

interface SearchResultsProps {
    results: (LessPokemonDetail | ItemDetails)[];
    typology: string;
    onSelectElement?: (element: AllPokemonDetail ) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({results,typology,onSelectElement}) => {
    function toPascalCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <Box>
            {results.length === 0 ? (
                <Typography>No results found</Typography>
            ) : (
                results.map((result) =>{
                    if (typeof result.name !== 'string') return null;
                    if (typology === "pokemon-compare") {
                        return (
                            <Box key={result.name} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <CardMedia
                                    component="img"
                                    src={(result as LessPokemonDetail).sprites.other.dream_world?.front_default || missingNo.src}
                                    sx={{
                                        height: "4rem",
                                        width: "4rem",
                                        objectFit: "contain",
                                        padding: "1rem",
                                    }}
                                    alt={toPascalCase(result.name)}
                                />
                                <Typography
                                    key={toPascalCase(result.name)}
                                    variant="h6"
                                    className="cursor-pointer capitalize"
                                    onClick={() => onSelectElement?.(result as AllPokemonDetail)}
                                >
                                    {toPascalCase(result.name)}
                                </Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Box key={result.name} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <CardMedia
                                    component="img"
                                    src={
                                        typology === "item"
                                            ? (result as ItemDetails).sprites?.default || missingNo.src
                                            : (result as LessPokemonDetail).sprites.other.dream_world?.front_default || missingNo.src
                                    }
                                    sx={{
                                        height: "4rem",
                                        width: "4rem",
                                        objectFit: "contain",
                                        padding: "1rem",
                                    }}
                                    alt={toPascalCase(result.name)}
                                />
                                <Link href={`/${typology}/${result.name}`} style={{ textDecoration: 'none' }}>
                                    <Typography variant="h6">{toPascalCase(result.name)}</Typography>
                                </Link>
                            </Box>
                        );
                    }
                })
            )}
        </Box>
    );
};

export default SearchResults;
