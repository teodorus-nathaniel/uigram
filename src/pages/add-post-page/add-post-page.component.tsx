import React, { useState, useRef } from 'react';
import ImageCarousel from '../../components/image-carousel/image-carousel.component';
import ImagesPreview from '../../components/images-preview/images-preview.component';

import './add-post-page.styles.scss';
import PlusIcon from '../../components/icons/plus/plus.component';
import SlideBar from '../../components/slide-bar/slide-bar.components';
import PostInput from './post-input/post-input.component';
import AngleIcon from '../../components/icons/angle/angle.component';
import Loading from '../../components/loading/loading.component';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import PostConfirmationOverlay from './post-confirmation-overlay/post-confirmation-overlay.component';
import { Dispatch } from 'redux';
import {
  clearTempPost,
  addPost,
  removePost
} from '../../redux/add-post/add-post.actions';
import PostDescriptionInput from './post-description-input/post-description-input.component';
import PostLinkInput from './post-link-input/post-link-input.component';

interface IProps {
  posts: string[];
  tempImage: string;
  error?: string;
  isFetching?: boolean;
  clearTempPost: () => void;
  addPost: (image: string) => void;
  removePost: (index: number) => void;
}

const slides = [ 'Images', 'Descriptions', 'Links' ];

function AddPostPagePlain ({
  posts,
  tempImage,
  isFetching,
  error,
  clearTempPost,
  addPost,
  removePost
}: IProps){
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ slideIndex, setSlideIndex ] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (target: number) => () => {
    if (target === currentStep) return;
    if (currentStep === 0 && posts.length === 0) return;
    setCurrentStep(target);
  };

  const scrollToInput = () => {
    if (window.innerWidth > 900) return;
    if (inputRef.current)
      window.scrollTo({
        top: inputRef.current.getBoundingClientRect().top,
        behavior: 'smooth'
      });
  };

  return (
    <div className="add-post-page">
      <PostConfirmationOverlay
        closeOverlay={clearTempPost}
        image={tempImage}
        confirmImage={addPost}
      />
      <div className="add-post-page__container">
        <div className="add-post-page__container__images scrollbar">
          {posts.length === 0 ? (
            <div className="add-post-page__container__images__plus">
              <PlusIcon color="white" size={5} onClick={scrollToInput} />
              <h2>Add at least 1 image to your post!</h2>
            </div>
          ) : (
            <ImageCarousel
              images={posts}
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
              onDeleteClick={removePost}
            />
          )}
        </div>
        <div className="add-post-page__container__image-preview">
          <ImagesPreview
            images={posts}
            onImageClick={setSlideIndex}
            activeImage={slideIndex}
          />
        </div>
        <div className="add-post-page__container__content" ref={inputRef}>
          <div
            className={`add-post-page__container__content__overlay${!isFetching
              ? '--hide'
              : ''}`}>
            <div>
              <Loading />
              <h2>Sit tight! Your image will be ready in a few seconds!</h2>
            </div>
          </div>
          <div className="add-post-page__container__content__content">
            <SlideBar
              activeSlide={currentStep}
              setActiveSlide={setCurrentStep}
              slides={slides}
            />

            {currentStep === 0 ? (
              <PostInput posts={posts} />
            ) : currentStep === 1 ? (
              <PostDescriptionInput />
            ) : (
              <PostLinkInput />
            )}

            <div className="add-post-page__container__content__content__actions">
              <div
                className={`button-step${currentStep - 1 < 0
                  ? '--hide'
                  : ''} add-post-page__container__content__content__actions__prev`}>
                <button onClick={handleButtonClick(currentStep - 1)}>
                  <AngleIcon color="white" />
                </button>
                <span>Prev</span>
              </div>
              <div
                className={`button-step${currentStep + 1 >= slides.length
                  ? '--hide'
                  : ''} add-post-page__container__content__content__actions__next`}>
                <button
                  disabled={posts.length === 0 && currentStep === 0}
                  onClick={handleButtonClick(currentStep + 1)}>
                  <AngleIcon rotate={180} color="white" />
                </button>
                <span>Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({
  addPost: { images, tempImage },
  fetchController: {
    errors: { ADD_URL_POST: error },
    isFetching: { ADD_URL_POST: isFetching }
  }
}: GlobalState) => ({
  posts: images,
  tempImage,
  error,
  isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearTempPost: () => dispatch(clearTempPost()),
  addPost: (image: string) => dispatch(addPost({ image })),
  removePost: (index: number) => dispatch(removePost({ index }))
});

const AddPostPage = connect(mapStateToProps, mapDispatchToProps)(
  AddPostPagePlain
);
export default AddPostPage;
