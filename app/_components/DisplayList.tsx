"use client";

import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {lessPokemonDetail} from "@/app/_services/customTypes/SinglePokemonInfo";
import {useRouter} from 'next/navigation';
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import ImageNotAvailable from "@/app/pictures/ImageNotAvailable.png";

interface ListedElementsProps {
    elements: lessPokemonDetail[] | berryDetails[] | itemDetails[];
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
    const getColumns = (elements: Array<lessPokemonDetail | berryDetails | itemDetails>): GridColDef[] => {
        if (elements.length === 0) return [];

        const sample = elements[0];

        if ("sprites" in sample) {
            // Pokémon
            return [
                {
                    field: "sprite",
                    headerName: "Image",
                    width: 175,
                    renderCell: (params) => (
                        <img
                            src={params.row.sprites.other.dream_world.front_default || ImageNotAvailable.src}
                            alt={params.row.name}
                            style={{width: 175, height: 175}}
                        />
                    ),
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
        } else if ("growth_time" in sample) {
            // Berry
            return [
                {field: "id", headerName: "ID", width: 80},
                {field: "name", headerName: "Name", width: 150},
                {field: "growth_time", headerName: "Growth Time", width: 150},
                {field: "size", headerName: "Size", width: 100},
                {field: "smoothness", headerName: "Smoothness", width: 120},
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
                    renderCell: (params) => (
                        <img
                            src={params.row.sprites.default || ImageNotAvailable.src}
                            alt={params.row.name}
                            style={{width: 75, height: 75}}
                        />
                    ),
                },
            ];
        }
        return [];
    };

    const getDetailRoute = (row: any): string => {
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
                getRowId={(row) => row.id}
                onRowClick={(params) => {router.push(getDetailRoute(params.row));}}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                paginationMeta={{hasNextPage}}
                pageSizeOptions={[5, 10, 20, 50]}
                rowCount={-1}
                rowHeight={175}
                loading={isLoading}
                disableColumnSorting
                sx={{border: 0}}
            />
        </div>
    )
};

export default DisplayList;
