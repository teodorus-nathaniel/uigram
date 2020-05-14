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
      <div
        className={`slide-bar__line`}
        style={{
          width: `calc(((100% - (120px * ${slides.length})) / ${slides.length -
            1} + 80px) * ${activeSlide} + 40px * ${activeSlide - 1 >= 0
            ? activeSlide - 1
            : 0})`
        }}
      />
    </div>
  );
}
// calc((100% - (120px * 3)) / 2)
