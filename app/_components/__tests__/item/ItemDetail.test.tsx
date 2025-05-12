import React from 'react';
import { render, screen } from '@testing-library/react';
import { ItemDetails } from '@/app/_utils/SingleItemInfo';
import ItemDetail from "@/app/_components/item/ItemDetail";

const mockItem: ItemDetails = {
    id: 1,
    name: 'potion',
    cost: 300,
    fling_power: 20,
    fling_effect: { name: 'none', url: '' },
    attributes: [{ name: 'consumable', url: '' }, { name: 'healing', url: '' }],
    category: { name: 'Medicine', url: '' },
    effect_entries: [
        { effect: 'Restores HP.', short_effect: 'Restores some HP.', language: { name: 'en', url: '' } }
    ],
    flavor_text_entries: [
        { text: 'A spray-type medicine for wounds.', language: { name: 'en', url: '' }, version_group: { name: 'red-blue', url: '' } }
    ],
    game_indices: [{ game_index: 1, generation: { name: 'generation-i', url: '' } }],
    names: [{ name: 'Potion', language: { name: 'en', url: '' } }],
    sprites: { default: '/images/potion.png' },
    held_by_pokemon: [
        {
            pokemon: { name: 'pikachu', url: '' },
            version_details: [{ rarity: 5, version: { name: 'red', url: '' } }]
        },
        {
            pokemon: { name: 'bulbasaur', url: '' },
            version_details: [{ rarity: 3, version: { name: 'blue', url: '' } }]
        }
    ]
};

describe('ItemDetail', () => {
    it('renders item details correctly', () => {
        render(<ItemDetail item={mockItem} />);

        expect(screen.getByRole('heading', { name: /potion/i })).toBeInTheDocument();
        expect(screen.getByAltText(/potion/i)).toHaveAttribute('src', '/images/potion.png');
        expect(screen.getByText(/id:/i)).toBeInTheDocument();
        expect(screen.getByText(/300/)).toBeInTheDocument();
        expect(screen.getByText('Category:')).toBeInTheDocument();
        expect(screen.getByText(/consumable, healing/i)).toBeInTheDocument();
        expect(screen.getByText(/restores hp/i)).toBeInTheDocument();
        expect(screen.getByText(/a spray-type medicine for wounds/i)).toBeInTheDocument();
        expect(screen.getByText(/pikachu, bulbasaur/i)).toBeInTheDocument();
    });

    it('shows "None" when no Pokémon hold the item', () => {
        const noPokemonItem = { ...mockItem, held_by_pokemon: [] };
        render(<ItemDetail item={noPokemonItem} />);
        expect(screen.getByText(/none/i)).toBeInTheDocument();
    });
});