import React, { useState } from 'react';
import ImageCarousel from '../../components/image-carousel/image-carousel.component';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import ImagesPreview from '../../components/images-preview/images-preview.component';

import './add-post-page.styles.scss';
import PlusIcon from '../../components/icons/plus/plus.component';
import SlideBar from '../../components/slide-bar/slide-bar.components';
import PostInput from './post-input/post-input.component';
import AngleIcon from '../../components/icons/angle/angle.component';

interface IProps {
  posts: string[];
  urlPost: string;
  addUrlPost: (url: string) => void;
}

function AddPostPagePlain ({ posts, urlPost, addUrlPost }: IProps){
  const [ currentStep, setCurrentStep ] = useState(0);

  const handleButtonClick = (target: number) => () => {
    if (target === currentStep) return;
    setCurrentStep(target);
  };

  return (
    <div className="add-post-page">
      <div className="add-post-page__container">
        <div className="add-post-page__container__images scrollbar">
          {posts.length === 0 ? (
            <div className="add-post-page__container__images__plus">
              <PlusIcon color="white" size={5} />
            </div>
          ) : (
            <ImageCarousel images={posts} />
          )}
        </div>
        <div className="add-post-page__container__image-preview">
          <ImagesPreview images={posts} />
        </div>
        <div className="add-post-page__container__content">
          <SlideBar
            activeSlide={currentStep}
            setActiveSlide={setCurrentStep}
            slides={[ 'Images', 'Descriptions' ]}
          />
          <PostInput posts={posts} />

          <div className="add-post-page__container__content__actions">
            <button
              onClick={handleButtonClick(0)}
              className={`button${currentStep === 0
                ? '--hide'
                : ''} add-post-page__container__content__actions__prev`}>
              <AngleIcon color="white" />
            </button>
            <button
              onClick={handleButtonClick(1)}
              className={`button${currentStep === 1
                ? '--hide'
                : ''} add-post-page__container__content__actions__next`}>
              <AngleIcon rotate={180} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ addPost: { images, urlImage } }: GlobalState) => ({
  posts: images,
  urlPost: urlImage
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addUrlPost: (url: string) =>
    dispatch(fetchApi({ name: 'ADD_URL_POST', data: { url } }))
});

const AddPostPage = connect(mapStateToProps, mapDispatchToProps)(
  AddPostPagePlain
);
export default AddPostPage;
