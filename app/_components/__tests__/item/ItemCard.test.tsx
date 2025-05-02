import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ItemDetails } from '@/app/_utils/SingleItemInfo';
import ItemCard from "@/app/_components/item/ItemCard";

jest.mock('@/app/_pictures/pokemonCardTemplate/missingNo.png', () => ({
    src: 'missingNo-mock.png'
}));
jest.mock('@/app/_pictures/pokemonCardTemplate/backgroundImage.jpg', () => ({
    src: 'backgroundImage-mock.jpg'
}));
jest.mock('@/app/_pictures/pokemonCardTemplate/trainerCard.png', () => ({
    src: 'trainerCard-mock.png'
}));

const mockItem: ItemDetails = {
    id: 1,
    name: 'potion',
    cost: 300,
    fling_power: 10,
    fling_effect: { name: 'none', url: '' },
    attributes: [{ name: 'consumable', url: '' }],
    category: { name: 'medicine', url: '' },
    effect_entries: [
        {
            effect: 'Restores 20 HP.',
            short_effect: 'Restores HP.',
            language: { name: 'en', url: '' },
        }
    ],
    flavor_text_entries: [
        {
            text: 'Restores 20 HP.',
            language: { name: 'en', url: '' },
            version_group: { name: 'red-blue', url: '' },
        }
    ],
    game_indices: [{ game_index: 1, generation: { name: 'generation-i', url: '' } }],
    names: [{ name: 'Potion', language: { name: 'en', url: '' } }],
    sprites: { default: 'potion-image.png' },
    held_by_pokemon: [
        { pokemon: { name: 'pikachu', url: '' }, version_details: [{ rarity: 5, version: { name: 'red', url: '' } }] }
    ]
};

describe('ItemCard', () => {
    it('renders item name in PascalCase', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('Potion')).toBeInTheDocument();
    });

    it('renders flavor text if available', () => {
        render(<ItemCard item={mockItem} />);
        expect(screen.getByText('Restores 20 HP.')).toBeInTheDocument();
    });

    it('falls back to default description if no English flavor text', () => {
        const itemNoText = {
            ...mockItem,
            flavor_text_entries: []
        };
        render(<ItemCard item={itemNoText} />);
        expect(screen.getByText('No description available.')).toBeInTheDocument();
    });

    it('renders the image with correct src and alt', () => {
        render(<ItemCard item={mockItem} />);
        const img = screen.getByAltText('potion') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain('potion-image.png');
    });

    it('renders missingNo image if no sprite provided', () => {
        const itemNoSprite = {
            ...mockItem,
            sprites: { default: null }
        };
        render(<ItemCard item={itemNoSprite} />);
        const img = screen.getByAltText('potion') as HTMLImageElement;
        expect(img.src).toContain('missingNo-mock.png');
    });

    it('links to correct item page', () => {
        render(<ItemCard item={mockItem} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/item/potion');
    });
});
