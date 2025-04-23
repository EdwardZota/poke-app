"use client";

import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {lessPokemonDetail} from "@/app/_services/customTypes/SinglePokemonInfo";
import {useRouter} from 'next/navigation';

interface ListedElementsProps {
    rows: lessPokemonDetail[];
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

const ListedElements = ({
    rows,
    paginationModel,
    onPaginationModelChange,
    hasNextPage,
    isLoading,
}: ListedElementsProps) => {
    const router = useRouter();
    const columns: GridColDef[] = [
        {
            field: "sprite",
            headerName: "Image",
            width: 175,
            renderCell: (params) => (
                <img
                    src={params.row.sprites.other.dream_world.front_default}
                    alt={params.row.name}
                    style={{width: 175, height: 175}}
                />
            ),
        },
        {field: "id", headerName: "ID", width: 80},
        {field: "name", headerName: "Name", width: 150},
        {field: "height", headerName: "Height", width: 100, type: "number"},
        {field: "weight", headerName: "Weight", width: 100, type: "number"},
    ];

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Pokémon List</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                onRowClick={(params) => {router.push(`/pokemon/${params.row.name}`);}}
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
        </div>)
};

export default ListedElements;
