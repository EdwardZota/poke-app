"use client";

import React, {useEffect, useRef, useState} from "react";
import {Button, Grid} from "@mui/material";
import {getLessDetailedPokemonList} from "@/app/_services/pokemonApi";
import { lessPokemonDetail } from "@/app/_services/customTypes/SinglePokemonInfo";
import DisplayList from "@/app/_components/DisplayList";
import DisplayGrid from "@/app/_components/DisplayGrid";
import SearchBar from "@/app/_components/SearchBar";
import {getTypeList} from "@/app/_services/typeApi";
import FilterSelect from "@/app/_components/FilterSelect";

const PokemonItems = () => {
    const [pokemon, setPokemon] = useState<lessPokemonDetail[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridView, setIsGridView] = useState(true);

    const [filteredPokemon, setFilteredPokemon] = useState<lessPokemonDetail[]>([]);
    const allPokemonRef = useRef<lessPokemonDetail[]>([]);
    const [activePokemon, setActivePokemon] = useState<lessPokemonDetail[]>([]);

    const [selectedType, setSelectedType] = useState('');

    const [typeOptions, setTypeOptions] = useState<string[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const offset = paginationModel.page * paginationModel.pageSize;
            const limit = paginationModel.pageSize;

            try {
                let dataToUse = allPokemonRef.current.length !== 0 ? allPokemonRef.current : activePokemon;
                if (selectedType) {
                    dataToUse = dataToUse.filter(pokemon =>
                        pokemon.types.some(t => t.type.name === selectedType)
                    );
                }
                const pagedData = dataToUse.slice(offset, offset + limit);
                setPokemon(pagedData);
                setHasNextPage(offset + limit < dataToUse.length);

                if (allPokemonRef.current.length === 0) {
                    const fallbackData = await getLessDetailedPokemonList(offset, limit);
                    setPokemon(fallbackData);
                    setHasNextPage(fallbackData.length === limit);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [paginationModel]);

    useEffect(() => {
        const prefetchAllPokemon = async () => {
            const chunkSize = 100;
            const total = 1500;
            const all: lessPokemonDetail[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getLessDetailedPokemonList(offset, chunkSize);
                    all.push(...chunk);
                    allPokemonRef.current = [...all];
                    setFilteredPokemon(all);
                    setActivePokemon(all);
                } catch (e) {
                    console.error(`Error in the chunk ${offset}`, e);
                    break;
                }
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        prefetchAllPokemon();
    }, []);

    useEffect(() => {
        const fetchFilters = async () => {
            const types = await getTypeList();
            setTypeOptions(types);
        };

        fetchFilters();
    }, []);

    const handleTypeFilterChange = (selected: string) => {
        setSelectedType(selected);
        const filtered = allPokemonRef.current.filter((pokemon) =>
            pokemon.types.some((t) => t.type.name === selected)
        );
        setActivePokemon(filtered);
        setPaginationModel({ page: 0, pageSize: 5 });
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsGridView((prev) => !prev)}
                sx={{marginBottom: "20px"}}
            >
                Toggle View
            </Button>
            <SearchBar allElements={filteredPokemon} typology={"pokemon"}/>
            <Grid>
                <FilterSelect
                    label="Type"
                    options={typeOptions}
                    value={selectedType}
                    onChange={handleTypeFilterChange}
                />
            </Grid>
            {isGridView ? (
                <DisplayGrid
                    elements={pokemon}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            ) : (
                <DisplayList
                    elements={pokemon}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default PokemonItems;
