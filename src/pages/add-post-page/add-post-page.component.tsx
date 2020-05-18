import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import PostConfirmationOverlay from './post-confirmation-modal/post-confirmation-modal.component';
import { Dispatch } from 'redux';
import {
  clearTempPost,
  addPost,
  removePost
} from '../../redux/add-post/add-post.actions';
import PostDescriptionInput from './post-description-input/post-description-input.component';
import PostLinkInput from './post-link-input/post-link-input.component';
import PostLoadingModal from './post-loading-modal/post-loading-modal.component';

interface IProps {
  posts: { link: string; file?: File }[];
  tempImage: string;
  tempFile?: File;
  error?: string;
  title: string;
  description: string;
  isFetching?: boolean;
  clearTempPost: () => void;
  addPost: (image: string, file?: File) => void;
  removePost: (index: number) => void;
}

const slides = [ 'Images', 'Details', 'Links' ];

function AddPostPagePlain ({
  posts,
  tempImage,
  isFetching,
  error,
  description,
  title,
  tempFile,
  clearTempPost,
  addPost,
  removePost
}: IProps){
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ slideIndex, setSlideIndex ] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);

  const canMoveToNextStep = useCallback(
    () => {
      if (currentStep === 0 && posts.length === 0) return false;
      if (currentStep === 1 && (!title || !description)) return false;

      return true;
    },
    [ currentStep, posts, title, description ]
  );

  useEffect(
    () => {
      setSlideIndex(posts.length - 1);
    },
    [ posts ]
  );

  const handleButtonClick = (target: number) => () => {
    if (target === currentStep) return;
    if (target > currentStep && !canMoveToNextStep()) return;
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

  const images = posts.map(({ link }) => link);

  return (
    <div className="add-post-page">
      <PostConfirmationOverlay
        closeOverlay={clearTempPost}
        image={tempImage}
        file={tempFile}
        confirmImage={addPost}
      />
      <PostLoadingModal />
      <div className="add-post-page__container">
        <div className="add-post-page__container__images scrollbar">
          {posts.length === 0 ? (
            <div className="add-post-page__container__images__plus">
              <PlusIcon color="white" size={5} onClick={scrollToInput} />
              <h2>Add at least 1 image to your post!</h2>
            </div>
          ) : (
            <ImageCarousel
              images={images}
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
              onDeleteClick={removePost}
            />
          )}
        </div>
        <div className="add-post-page__container__image-preview">
          <ImagesPreview
            images={images}
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
              setActiveSlide={(idx: number) => {
                if (!canMoveToNextStep() && idx > currentStep) return;
                setCurrentStep(idx);
              }}
              slides={slides}
            />

            {currentStep === 0 ? (
              <PostInput posts={images} error={error} />
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
                  disabled={!canMoveToNextStep()}
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
  addPost: { images, tempImage, tempFile, title, description },
  fetchController: {
    errors: { ADD_URL_POST: error },
    isFetching: { ADD_URL_POST: isFetching }
  }
}: GlobalState) => ({
  posts: images,
  tempImage,
  tempFile,
  error,
  isFetching,
  title,
  description
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearTempPost: () => dispatch(clearTempPost()),
  addPost: (image: string, file?: File) => dispatch(addPost({ image, file })),
  removePost: (index: number) => dispatch(removePost({ index }))
});

const AddPostPage = connect(mapStateToProps, mapDispatchToProps)(
  AddPostPagePlain
);
export default AddPostPage;
