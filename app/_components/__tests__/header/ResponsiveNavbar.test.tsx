import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResponsiveNavbar from "@/app/_components/header/ResponsiveNavbar";

describe('ResponsiveNavbar', () => {
    const mockPages = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
    ];

    const setAnchorElNav = jest.fn();

    it('renders the menu icon button', () => {
        render(<ResponsiveNavbar pages={mockPages} setAnchorElNav={setAnchorElNav} anchorElNav={null} />);

        const menuButton = screen.getByLabelText('account of current user');
        expect(menuButton).toBeInTheDocument();
    });

    it('calls setAnchorElNav on menu button click', () => {
        render(<ResponsiveNavbar pages={mockPages} setAnchorElNav={setAnchorElNav} anchorElNav={null} />);

        const menuButton = screen.getByLabelText('account of current user');
        fireEvent.click(menuButton);

        expect(setAnchorElNav).toHaveBeenCalledTimes(1);
    });

    it('shows menu when anchorElNav is set', () => {
        const dummyElement = document.createElement('div');
        render(<ResponsiveNavbar pages={mockPages} setAnchorElNav={setAnchorElNav} anchorElNav={dummyElement} />);

        const menu = screen.getByRole('presentation'); // MUI Menu uses role=presentation
        expect(menu).toBeInTheDocument();
    });

    it('renders all page buttons inside the menu', () => {
        const dummyElement = document.createElement('div');
        render(<ResponsiveNavbar pages={mockPages} setAnchorElNav={setAnchorElNav} anchorElNav={dummyElement} />);

        mockPages.forEach(page => {
            const button = screen.getByRole('button', { name: page.name });
            expect(button).toBeInTheDocument();

            const link = button.closest('a');
            expect(link).toHaveAttribute('href', page.url);
        });
    });
});
