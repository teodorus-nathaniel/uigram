import React, { useState } from 'react';
import './image-carousel.styles.scss';
import AngleIcon from '../icons/angle/angle.component';
import CrossIcon from '../icons/cross/cross.compnent';

interface IProps {
  images: string[];
  slideIndex: number;
  setSlideIndex: (idx: number) => void;
  onDeleteClick?: (idx: number) => void;
}

export default function ImageCarousel ({
  images,
  setSlideIndex,
  slideIndex,
  onDeleteClick
}: IProps){
  const slide = (change: -1 | 1) => () => {
    const newIdx = slideIndex + change;
    setSlideIndex(newIdx);
  };

  return (
    <div className="image-carousel scrollbar">
      <div
        className="arrow arrow-right"
        onClick={slide(1)}
        style={{ opacity: slideIndex >= images.length - 1 ? 0 : 'initial' }}>
        <AngleIcon rotate={180} color="white" />
      </div>
      <div
        className="arrow arrow-left"
        onClick={slide(-1)}
        style={{ opacity: slideIndex <= 0 ? 0 : 'initial' }}>
        <AngleIcon color="white" />
      </div>
      {onDeleteClick ? (
        <div className="delete-btn" onClick={() => onDeleteClick(slideIndex)}>
          <CrossIcon color="white" />
        </div>
      ) : null}
      <div
        className="image-carousel__container scrollbar"
        style={{
          width: `calc(100% * ${images.length})`,
          transform: `translateX(-${100 / images.length * slideIndex}%)`
        }}>
        {images.map((image, idx) => (
          <div
            className="image-carousel__slide scrollbar"
            style={{ width: `calc(100% / ${images.length})` }}
            key={idx}>
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
