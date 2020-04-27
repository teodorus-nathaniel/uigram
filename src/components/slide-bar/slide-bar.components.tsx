import React, { useRef } from 'react';
import './slide-bar.styles.scss';

interface IProps {
    slides: string[];
    activeSlide: number;
    setActiveSlide: (slide: number) => void;
    saveState?: (state: any) => void;
    getSavedState?: () => any;
}

export default function SlideBar({
    slides,
    activeSlide,
    setActiveSlide,
    saveState,
    getSavedState
}: IProps) {
    const borderRef = useRef<HTMLDivElement>(null);
    console.log(100 * (activeSlide + 1))
    return (
        <div className='slide-bar'>
            {slides.map((slide, idx) => (
                <div className={`slide${idx === activeSlide ? '-active' : ''}`} key={slide}>
                    <span>{slide}</span>
                </div>
            ))}
            <div
                ref={borderRef}
                style={{
                    width: `calc((100% / ${slides.length}) * ${(activeSlide + 1)}`,
                    left: `calc(100% / ${slides.length * 2} * (${activeSlide + 1}))`
                }}
                className='slide-bar__active-border'
            />
        </div>
    );
}