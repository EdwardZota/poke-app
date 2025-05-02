"use client";

import React, {useEffect, useRef, useState} from "react";
import { Button } from "@mui/material";
import DisplayList from "@/app/_components/DisplayList";
import DisplayGrid from "@/app/_components/DisplayGrid";
import {ItemDetails} from "@/app/_utils/SingleItemInfo";
import {getAllDetailedItemList} from "@/app/_services/ItemApi";
import SearchBar from "@/app/_components/SearchBar";

const PokemonItems = () => {
    const [item, setItem] = useState<ItemDetails[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const [allItem, setAllItem] = useState<ItemDetails[]>([]);
    const allBerryRef = useRef<ItemDetails[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const offset = paginationModel.page * paginationModel.pageSize;
            const limit = paginationModel.pageSize;

            try {
                if (allBerryRef.current) {
                    const pagedData = allBerryRef.current.slice(offset, offset + limit);
                    setItem(pagedData);
                    setHasNextPage(offset + limit < allBerryRef.current.length);
                } else {
                    const data = await getAllDetailedItemList(offset, limit);
                    setItem(data);
                    setHasNextPage(data.length === limit);
                }
            } catch (error) {
                //TODO toast must be implemented
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [paginationModel]);

    useEffect(() => {
        const prefetchAllItem = async () => {
            const chunkSize = 100;
            const total = 2200;
            const all: ItemDetails[] = [];

            for (let offset = 0; offset < total; offset += chunkSize) {
                try {
                    const chunk = await getAllDetailedItemList(offset, chunkSize);
                    all.push(...chunk);
                    allBerryRef.current = [...all];
                    setAllItem(all)
                } catch (e) {
                    console.error(`Error in the  chunk ${offset}`, e);
                    break;
                }
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        prefetchAllItem();
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

            <SearchBar allElements={allItem} typology={"item"}/>
            {isGridView ? (
                <DisplayGrid
                    elements={item}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                />
            ) : (
                <DisplayList
                    elements={item}
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
