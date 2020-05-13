import React from 'react';
import './images-preview.styles.scss';

interface Props {
  images: string[];
}

export default function ImagesPreview ({ images }: Props){
  return (
    <div className="images-preview">
      {images.map((image, idx) => (
        <div className="images-preview__image" key={idx}>
          <img src={image} alt="post" />
        </div>
      ))}
    </div>
  );
}
