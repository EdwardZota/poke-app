import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from "@/app/_components/header/Navbar";

jest.mock('@/app/_pictures/PokemonImage.png', () => 'test-file-stub');
jest.mock('@/app/_components/header/ResponsiveNavbar', () => () => <div data-testid="ResponsiveNavbar" />);
jest.mock('@/app/_components/header/DarkLightSwitch', () => ({ handleChangeAction, mode }: any) => (
    <button data-testid="DarkLightSwitch" onClick={handleChangeAction}>
        {mode ? 'Dark' : 'Light'}
    </button>
));
jest.mock('@/app/_components/header/NavbarPages', () => () => <div data-testid="NavbarPages" />);

describe('Navbar', () => {
    const mockHandleChange = jest.fn();

    beforeEach(() => {
        mockHandleChange.mockClear();
    });

    it('renders all child components', () => {
        render(<Navbar handleChangeAction={mockHandleChange} mode={false} />);

        expect(screen.getByAltText('Pokemon Image')).toBeInTheDocument();
        expect(screen.getByTestId('ResponsiveNavbar')).toBeInTheDocument();
        expect(screen.getByTestId('NavbarPages')).toBeInTheDocument();
        expect(screen.getByTestId('DarkLightSwitch')).toBeInTheDocument();
    });

    it('calls handleChangeAction when DarkLightSwitch is clicked', () => {
        render(<Navbar handleChangeAction={mockHandleChange} mode={false} />);

        const switchButton = screen.getByTestId('DarkLightSwitch');
        fireEvent.click(switchButton);

        expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });

    it('displays correct mode label', () => {
        const { rerender } = render(<Navbar handleChangeAction={mockHandleChange} mode={false} />);
        expect(screen.getByText('Light')).toBeInTheDocument();

        rerender(<Navbar handleChangeAction={mockHandleChange} mode={true} />);
        expect(screen.getByText('Dark')).toBeInTheDocument();
    });
});
