import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterNavbar from "@/app/_components/footer/FooterNavbar";
import '@testing-library/jest-dom';

describe('FooterNavbar', () => {
    it('renders without crashing', () => {
        render(<FooterNavbar />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it('contains the Impressum button', () => {
        render(<FooterNavbar />);
        const button = screen.getByRole('button', { name: /impressum/i });
        expect(button).toBeInTheDocument();
    });

    it('has the correct button text', () => {
        render(<FooterNavbar />);
        const button = screen.getByText('Impressum');
        expect(button).toBeVisible();
    });

    it('renders Toolbar inside Container inside AppBar', () => {
        render(<FooterNavbar />);
        const appBar = screen.getByRole('contentinfo');
        const container = appBar.querySelector('.MuiContainer-root');
        const toolbar = container?.querySelector('.MuiToolbar-root');

        expect(container).toBeInTheDocument();
        expect(toolbar).toBeInTheDocument();
    });
});
