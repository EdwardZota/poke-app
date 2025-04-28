"use client";

import React, {useEffect, useRef, useState} from "react";
import { Button } from "@mui/material";
import DisplayList from "@/app/_components/DisplayList";
import PokemonGrid from "@/app/_components/DisplayGrid";
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {
    getAllDetailedBerryList,
} from "@/app/_services/berryApi";
import SearchBar from "@/app/_components/SearchBar";

const PokemonItems = () => {
    const [berry, setBerry] = useState<berryDetails[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const [allBerry, setAllBerry] = useState<berryDetails[]>([]);
    const allBerryRef = useRef<berryDetails[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const offset = paginationModel.page * paginationModel.pageSize;
            const limit = paginationModel.pageSize;

            try {
                if (allBerryRef.current) {
                    const pagedData = allBerryRef.current.slice(offset, offset + limit);
                    setBerry(pagedData);
                    setHasNextPage(offset + limit < allBerryRef.current.length);
                } else {
                    const data = await getAllDetailedBerryList(offset, limit);
                    setBerry(data);
                    setHasNextPage(data.length === limit);
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
        const prefetchAllBerry = async () => {
            const chunkSize = 100;
            const total = 100;
            const all: berryDetails[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getAllDetailedBerryList(offset, chunkSize);
                    all.push(...chunk);
                    allBerryRef.current = [...all];
                    setAllBerry(all)
                } catch (e) {
                    console.error(`Error in the  chunk ${offset}`, e);
                    break;
                }
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        prefetchAllBerry();
    }, []);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsGridView((prev) => !prev)}
                sx={{ marginBottom: "20px" }}
            >
                Toggle View
            </Button>
            <SearchBar allElements={allBerry} typology={"berry"}/>
            {isGridView ? (
                <PokemonGrid
                    elements={berry}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            ) : (
                <DisplayList
                    elements={berry}
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
