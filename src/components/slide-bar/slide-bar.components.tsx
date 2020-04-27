import React, { useRef } from 'react';
import './slide-bar.styles.scss';

interface IProps {
  slides: string[];
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
  saveState?: (state: any) => void;
  getSavedState?: () => any;
}

export default function SlideBar ({
  slides,
  activeSlide,
  setActiveSlide,
  saveState,
  getSavedState
}: IProps){
  console.log(100 * (activeSlide + 1));
  return (
    <div className="slide-bar">
      {slides.map((slide, idx) => (
        <div
          className={`slide${idx < activeSlide
            ? '-active'
            : idx === activeSlide ? '-last-active' : ''}`}
          key={slide}>
          <span>{slide}</span>
        </div>
      ))}
      <div className={`slide-bar__line${activeSlide === 1 ? '--done' : ''}`} />
    </div>
  );
}
