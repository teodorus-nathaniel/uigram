import React from 'react';
import './post-image.styles.scss';
import Button from '../button/button.component';
import UploadImages from '../upload-images/upload-images.components';
import { Image } from '../../@types/image.interface';

interface IProps {
  activeSlide: number;
  setSlide: (nav: string) => void;
  images: Image[];
  setImages: (e: Image[]) => void;
  error: string;
}

export default function PostImage ({
  setSlide,
  activeSlide,
  images,
  setImages,
  error
}: IProps){
  return (
    <div className="post-image">
      <h2 className="heading">Post Image</h2>
      <UploadImages images={images} setImages={setImages} />
      <div className="post-image__nav">
        <span className="post-image__nav__error">{error}</span>
        <Button
          className="post-image__nav__button"
          onClick={() => setSlide('next')}>
          Next
        </Button>
      </div>
    </div>
  );
}
