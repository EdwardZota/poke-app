import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarPages from "@/app/_components/header/NavbarPages";

describe('NavbarPages', () => {
    const mockPages = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
    ];

    const handleCloseNavMenu = jest.fn();

    beforeEach(() => {
        handleCloseNavMenu.mockClear();
    });

    it('renders all pages as buttons inside links', () => {
        render(<NavbarPages pages={mockPages} handleCloseNavMenu={handleCloseNavMenu} />);

        mockPages.forEach(page => {
            const button = screen.getByRole('button', { name: page.name });
            expect(button).toBeInTheDocument();

            const link = button.closest('a');
            expect(link).toHaveAttribute('href', page.url);
        });
    });

    it('calls handleCloseNavMenu when a button is clicked', () => {
        render(<NavbarPages pages={mockPages} handleCloseNavMenu={handleCloseNavMenu} />);

        const button = screen.getByRole('button', { name: 'Home' });
        fireEvent.click(button);

        expect(handleCloseNavMenu).toHaveBeenCalledTimes(1);
    });
});
