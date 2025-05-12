import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarImage from "@/app/_components/header/NavbarImage";

describe('NavbarImage', () => {
    const mockProps = {
        imageSrc: 'test-image.png',
        altText: 'Test Image',
        linkUrl: '/test',
        height: 50,
    };

    it('renders the image with correct src, alt, and height', () => {
        render(<NavbarImage {...mockProps} />);

        const img = screen.getByAltText('Test Image') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain('test-image.png');
        expect(img.alt).toBe('Test Image');
        expect(img.style.height).toBe('50px');
    });

    it('wraps the image inside the correct link', () => {
        render(<NavbarImage {...mockProps} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/test');
    });

    it('handles StaticImageData input correctly', () => {
        const staticMock = { src: 'static-image.png' };
        render(<NavbarImage {...mockProps} imageSrc={staticMock.src} />);

        const img = screen.getByAltText('Test Image') as HTMLImageElement;
        expect(img.src).toContain('static-image.png');
    });

    it('renders without optional props (altText, height)', () => {
        render(<NavbarImage imageSrc="simple.png" linkUrl="/simple" />);

        const img = screen.getByRole('img') as HTMLImageElement;
        expect(img.src).toContain('simple.png');
        expect(img.alt).toBe('');
        expect(img.style.height).toBe('');
    });
});
