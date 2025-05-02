import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
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
        <Box sx={{ position: "relative", width: "15rem" }}>
            <TextField
                label="Search"
                onChange={handleSearchChange}
                sx={{ width: "100%" }}
            />

            {filteredResults.length > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        backgroundColor: "background.paper",
                        boxShadow: 3,
                        maxHeight: "300px",
                        overflowY: "auto",
                        borderRadius: 1,
                        mt: 1,
                    }}
                >
                    <SearchResults
                        results={filteredResults}
                        typology={typology}
                        onSelectElement={onSelectElement}
                    />
                </Box>




                )}
        </Box>
    );
};

export default SearchBar;
