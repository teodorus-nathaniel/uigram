import React, { useRef } from 'react';
import './slide-bar.styles.scss';

interface IProps {
  slides: string[];
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}

export default function SlideBar ({
  slides,
  activeSlide,
  setActiveSlide
}: IProps){
  return (
    <div className="slide-bar">
      {slides.map((slide, idx) => (
        <div
          className={`slide${idx < activeSlide
            ? '--active'
            : idx === activeSlide ? '--last-active' : ''}`}
          key={slide}>
          <div onClick={() => setActiveSlide(idx)}>{idx + 1}</div>
          <span>{slide}</span>
        </div>
      ))}
      <div className={`slide-bar__line${activeSlide === 1 ? '--done' : ''}`} />
    </div>
  );
}
