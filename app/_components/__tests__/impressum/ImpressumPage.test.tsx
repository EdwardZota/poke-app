import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImpressumPage from "@/app/_components/impressum/ImpressumPage";

describe('ImpressumPage', () => {
    beforeEach(() => {
        render(<ImpressumPage />);
    });

    it('renders the main heading', () => {
        const heading = screen.getByRole('heading', { name: /impressum/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders the team section', () => {
        expect(screen.getByText(/Pokémon-Wiki Team/i)).toBeInTheDocument();
        expect(screen.getByText(/Edward Zota, Nico Schiffer, Nick Schuster/i)).toBeInTheDocument();
        expect(screen.getByText(/Bertha-Benz-Platz 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Deutschland/i)).toBeInTheDocument();
    });

    it('renders the contact section', () => {
        expect(screen.getByText('Kontakt', { selector: 'p.css-lhsbas-MuiTypography-root' })).toBeInTheDocument();
        expect(screen.getByText(/Telefon: \+49 123 456789/i)).toBeInTheDocument();
        expect(screen.getByText(/E-Mail: kontakt@pokewiki.dev/i)).toBeInTheDocument();
    });

    it('renders the legal notices section', () => {
        expect(screen.getByText(/Rechtliche Hinweise/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Als Diensteanbieter sind wir gemäß § 7 Abs\.1 TMG/i).length).toBeGreaterThan(0);
    });

    it('renders the sources section', () => {
        expect(screen.getByText(/Quellen/i)).toBeInTheDocument();
    });
});
