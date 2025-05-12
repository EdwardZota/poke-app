import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as pokemonApi from '@/app/_services/pokemonApi';
import ComparePage from "@/app/_components/compare/ComparePage";

jest.mock('react-toastify', () => ({
    toast: { error: jest.fn() }
}));
jest.mock('@/app/_components/searchbar/SearchBar', () => (props: any) => (
    <div data-testid="SearchBar" />
));
jest.mock('@/app/_components/compare/PokemonComparisonTable', () => (props: any) => (
    <div data-testid="PokemonComparisonTable" />
));

describe('ComparePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders title and components', () => {
        render(<ComparePage />);
        expect(screen.getByText('Compare Page')).toBeInTheDocument();
        expect(screen.getByTestId('SearchBar')).toBeInTheDocument();
        expect(screen.getByTestId('PokemonComparisonTable')).toBeInTheDocument();
    });

    it('fetches Pokémon list on mount', async () => {
        const mockData = [{ name: 'bulbasaur' }];
        const getAllDetailedPokemonListSpy = jest
            .spyOn(pokemonApi, 'getAllDetailedPokemonList')
            .mockResolvedValue(mockData as any);

        render(<ComparePage />);

        await waitFor(() => {
            expect(getAllDetailedPokemonListSpy).toHaveBeenCalled();
        });
    });

    it('handles API error gracefully', async () => {
        const getAllDetailedPokemonListSpy = jest
            .spyOn(pokemonApi, 'getAllDetailedPokemonList')
            .mockRejectedValue(new Error('API error'));

        render(<ComparePage />);

        await waitFor(() => {
            expect(getAllDetailedPokemonListSpy).toHaveBeenCalled();
        });
    });
});
