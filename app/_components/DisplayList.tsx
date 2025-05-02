"use client";

import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {LessPokemonDetail} from "@/app/_utils/SinglePokemonInfo";
import {useRouter} from 'next/navigation';
import {ItemDetails} from "@/app/_utils/SingleItemInfo";
import missingNo from "@/app/_pictures/pokemonCardTemplate/missingNo.png"

interface ListedElementsProps {
    elements: (LessPokemonDetail | ItemDetails)[];
    paginationModel: {
        page: number;
        pageSize: number;
    };
    onPaginationModelChange: (model: {
        page: number;
        pageSize: number
    }) => void;
    hasNextPage: boolean;
    isLoading: boolean;
}

const DisplayList = ({
     elements,
     paginationModel,
     onPaginationModelChange,
     hasNextPage,
     isLoading,
}: ListedElementsProps) => {
    const router = useRouter();
    const getColumns = (elements: (LessPokemonDetail | ItemDetails)[]): GridColDef[] => {
        if (elements.length === 0) return [];

        const sample = elements[0];

        if ("sprites" in sample) {
            // Pokémon
            return [
                {
                    field: "sprite",
                    headerName: "Image",
                    width: 175,
                    renderCell: (params) => {
                        const row = params.row as LessPokemonDetail;
                        return (
                            <img
                                src={row.sprites.other?.dream_world?.front_default ?? missingNo.src}

                                alt={row.name}
                                style={{ width: 175, height: 175 }}
                            />
                        );
                    },
                },
                {field: "id", headerName: "ID", width: 80},
                {field: "name", headerName: "Name", width: 150},
                {
                    field: "height",
                    headerName: "Height",
                    width: 100,
                    type: "number"
                },
                {
                    field: "weight",
                    headerName: "Weight",
                    width: 100,
                    type: "number"
                },
            ];
        } else if ("cost" in sample && "category" in sample) {
            // Item
            return [
                {field: "id", headerName: "ID", width: 80},
                {field: "name", headerName: "Name", width: 150},
                {field: "cost", headerName: "Cost", width: 100},
                {
                    field: "sprite",
                    headerName: "Image",
                    width: 100,
                    renderCell: (params) => {
                        const row = params.row as ItemDetails;
                        return (
                            <img
                                src={row.sprites.default ?? missingNo.src}
                                alt={row.name}
                                style={{ width: 75, height: 75 }}
                            />
                        );
                    },
                },
            ];
        }
        return [];
    };

    const getDetailRoute = (row: LessPokemonDetail | ItemDetails): string => {
        switch (true) {
            case 'growth_time' in row:
                return `/berry/${row.name}`;
            case 'cost' in row && 'category' in row:
                return `/item/${row.name}`;
            default:
                return `/pokemon/${row.name}`;
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">List</h1>
            <DataGrid
                rows={elements}
                columns={getColumns(elements)}
                getRowId={(row: LessPokemonDetail | ItemDetails) => row.id}
                onRowClick={(params) => {router.push(getDetailRoute(params.row as LessPokemonDetail | ItemDetails));}} paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                paginationMeta={{hasNextPage}}
                pageSizeOptions={[5, 10, 20, 50]}
                rowCount={-1}
                rowHeight={175}
                loading={isLoading}
                disableColumnSorting
                disableColumnMenu
                sx={{border: 0}}
            />
        </div>
    )
};

export default DisplayList;
