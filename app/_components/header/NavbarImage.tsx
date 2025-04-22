'use client';
import * as React from 'react';
import { StaticImageData } from 'next/image';

type NavbarImageProps = {
    imageSrc: string | StaticImageData;
    altText?: string;
    linkUrl?: string;
    height?: number;
};

function NavbarImage({imageSrc, altText, linkUrl, height}: NavbarImageProps) {
    const imgSrc = typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
    return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer"><img src={imgSrc}
                                                                    alt={altText} style={{
            marginLeft: "3rem",
            marginRight: "3rem",
            height: height
        }}/></a>
    )
}

export default NavbarImage;