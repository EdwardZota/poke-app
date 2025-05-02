import React, { useState } from 'react';
import { TextField } from '@mui/material';
import {
    AllPokemonDetail,
    LessPokemonDetail
} from "@/app/_utils/SinglePokemonInfo";
import SearchResults from "@/app/_components/SearchResults";
import { ItemDetails } from "@/app/_utils/SingleItemInfo";

interface SearchBarProps {
    allElements: (LessPokemonDetail | ItemDetails)[];
    typology: string
    onSelectElement?: (pokemon: AllPokemonDetail) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ allElements, typology, onSelectElement }) => {
    const [filteredResults, setFilteredResults] = useState<(LessPokemonDetail | ItemDetails)[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        if (searchQuery === "") {
            setFilteredResults([]);
        } else {
            const filtered = allElements
                .filter((item) => {
                    if (typeof item.name === 'string') {
                        return item.name.toLowerCase().includes(searchQuery);
                    }
                    return false;
                })
                .slice(0, 5);
            setFilteredResults(filtered);
        }
    };

    return (
        <>
            <TextField
                label="Search"
                variant="outlined"
                onChange={handleSearchChange}
                sx={{ mb: 2 }}
            />
            {filteredResults.length > 0 && (
                <SearchResults
                    results={filteredResults}
                    typology={typology}
                    onSelectElement={onSelectElement}
                />
            )}
        </>
    );
};


export default SearchBar;
