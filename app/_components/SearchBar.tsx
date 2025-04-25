import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { lessPokemonDetail } from "@/app/_services/customTypes/SinglePokemonInfo";
import SearchResults from "@/app/_components/SearchResults";
import { berryDetails } from "@/app/_services/customTypes/SingleBerryInfo";
import { itemDetails } from "@/app/_services/customTypes/SingleItemInfo";

interface SearchBarProps {
    allElements: (lessPokemonDetail | berryDetails | itemDetails)[];
    typology: string
}

const SearchBar: React.FC<SearchBarProps> = ({ allElements,typology }) => {
    const [filteredResults, setFilteredResults] = useState<(lessPokemonDetail | berryDetails | itemDetails)[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value.toLowerCase();
        if (searchQuery === "") {
            setFilteredResults([]);
        } else {
            const filtered = allElements
                .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery)
                )
                .slice(0, 5);
            setFilteredResults(filtered);
        }
    };

    return (
        <>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                onChange={handleSearchChange}
                sx={{ mb: 2 }}
            />
            {filteredResults.length > 0 && (
                <SearchResults results={filteredResults} typology={typology}/>
            )}
        </>
    );
};

export default SearchBar;
