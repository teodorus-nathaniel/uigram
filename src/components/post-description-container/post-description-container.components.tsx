import React, { useState } from 'react';
import Button from '../button/button.component';
import './post-description-container.styles.scss';
import { Image } from '../../@types/image.interface';
import PostDescription from '../post-description/post-description.components';
import { isEmpty } from '../../utils/validations';

interface IProps {
  images: Image[];
  activeSlide: number;
  setSlide: (nav: string) => void;
  error: string;
}

export default function PostDescriptionContainer ({
  images,
  activeSlide,
  setSlide,
  error
}: IProps){
  const [ title, setTitle ] = useState({
    value: '',
    error: ''
  });
  const [ description, setDescription ] = useState({
    value: '',
    error: ''
  });

  //gabung images sma detail trus post ke backend
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    error = isEmpty('Title', title.value);
    if (error !== '') {
      setTitle((prev) => ({
        value: '',
        error: error
      }));
      console.log(title);
      return;
    }
    error = isEmpty('Description', description.value);
    if (error !== '') {
      setDescription((prev) => ({
        value: '',
        error: error
      }));
      return;
    }
    setTitle((prev) => ({
      ...prev,
      error: ''
    }));
    setTitle((prev) => ({
      ...prev,
      error: ''
    }));
  };

  const handleChange = async (e: any, name: string) => {
    if (name === 'title') setTitle(e.target.value);
    else if (name === 'description') setDescription(e.target.value);
  };

  return (
    <div className="post-description-container">
      <h2 className="heading">Post Description</h2>
      <PostDescription
        title={title}
        description={description}
        handleChange={handleChange}
      />
      <div className="post-description-container__nav">
        <Button
          className="post-description-container__nav__button"
          onClick={() => setSlide('prev')}>
          Prev
        </Button>
        <span>{error}</span>
        <Button
          className="post-description-container__nav__button"
          onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  );
}
