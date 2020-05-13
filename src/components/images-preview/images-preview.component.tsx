import React from 'react';
import './images-preview.styles.scss';

interface Props {
  images: string[];
  activeImage: number;
  onImageClick: (idx: number) => void;
}

export default function ImagesPreview ({
  images,
  onImageClick,
  activeImage
}: Props){
  return (
    <div className="images-preview">
      {images.map((image, idx) => (
        <div
          className={`images-preview__image${activeImage === idx
            ? '--active'
            : ''}`}
          key={idx}
          onClick={() => onImageClick(idx)}>
          <img src={image} alt="post" />
        </div>
      ))}
    </div>
  );
}
