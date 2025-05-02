'use client';
import * as React from 'react';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface NavbarImageProps {
    imageSrc: string | StaticImageData;
    altText?: string;
    linkUrl: string;
    height?: number;
}

function NavbarImage({imageSrc, altText, linkUrl, height}: NavbarImageProps) {
    const imgSrc = typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
    return (
        <Link href={linkUrl}>
            <img
                src={imgSrc}
                alt={altText} style={{
                    marginLeft: "3rem",
                    marginRight: "3rem",
                    height: height
        }}/></Link>
    )
}

export default NavbarImage;