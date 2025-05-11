"use client";

import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {getLessDetailedPokemonList} from "@/app/_services/pokemonApi";
import { LessPokemonDetail } from "@/app/_utils/SinglePokemonInfo";
import DisplayList from "@/app/_components/DisplayList";
import DisplayGrid from "@/app/_components/DisplayGrid";
import SearchBar from "@/app/_components/searchbar/SearchBar";
import {getTypeList} from "@/app/_services/typeApi";
import FilterSelect from "@/app/_components/FilterSelect";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

const PokemonItems = () => {
    const [pokemon, setPokemon] = useState<LessPokemonDetail[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridView, setIsGridView] = useState(true);

    const [filteredPokemon, setFilteredPokemon] = useState<LessPokemonDetail[]>([]);
    const allPokemonRef = useRef<LessPokemonDetail[]>([]);
    const [activePokemon, setActivePokemon] = useState<LessPokemonDetail[]>([]);

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
                if (error instanceof AxiosError) {
                    toast.error(`Axios error: ${error.response?.data?.message ?? error.message ?? 'Unknown error'}`);
                }
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
            const all: LessPokemonDetail[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getLessDetailedPokemonList(offset, chunkSize);
                    all.push(...chunk);
                    allPokemonRef.current = [...all];
                    setFilteredPokemon(all);
                    setActivePokemon(all);
                } catch (error) {
                    if (error instanceof AxiosError) {
                        toast.error(`Axios error: ${error.response?.data?.message ?? error.message ?? 'Unknown error'}`);
                    }
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
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                }}
            >
                <FilterSelect
                    label="Type"
                    options={typeOptions}
                    value={selectedType}
                    onChange={handleTypeFilterChange}
                />
                <SearchBar allElements={filteredPokemon} typology={"pokemon"} />
                <Button
                    sx={{maxHeight: "3.5rem", width: "10rem", marginLeft: "1.5rem"}}
                    variant="contained"
                    color="primary"
                    onClick={() => setIsGridView((prev) => !prev)}
                >Toggle View</Button>
            </Box>

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
