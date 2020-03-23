import React, { useState } from 'react';
import './image-carousel.styles.scss';
import AngleIcon from '../icons/angle/angle.component';

interface IProps {
  images: string[];
}

export default function ImageCarousel ({ images }: IProps){
  const [ slideIndex, setSlideIndex ] = useState(0);

  const slideLeft = () => setSlideIndex(slideIndex - 1);
  const slideRight = () => setSlideIndex(slideIndex + 1);

  return (
    <div className='image-carousel scrollbar'>
      <div
        className='arrow arrow-right'
        onClick={slideRight}
        style={{ opacity: slideIndex >= images.length - 1 ? 0 : 'initial' }}>
        <AngleIcon rotate={180} color='white' />
      </div>
      <div
        className='arrow arrow-left'
        onClick={slideLeft}
        style={{ opacity: slideIndex <= 0 ? 0 : 'initial' }}>
        <AngleIcon color='white' />
      </div>
      <div
        className='image-carousel__container scrollbar'
        style={{
          width: `calc(100% * ${images.length})`,
          transform: `translateX(-${100 / images.length * slideIndex}%)`
        }}>
        {images.map((image, idx) => (
          <div
            className='image-carousel__slide scrollbar'
            style={{ width: `calc(100% / ${images.length})` }}
            key={idx}>
            <img src={image} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
}
