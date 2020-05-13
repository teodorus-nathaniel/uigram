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
  clearUrlPost,
  addPost,
  addTempPost
} from '../../redux/add-post/add-post.actions';

interface IProps {
  posts: string[];
  tempImage: string;
  error?: string;
  isFetching?: boolean;
  clearUrlPost: () => void;
  addPost: (image: string) => void;
}
// TODO: VALIDASI GA BSA KE KANAN KALO GA DA IMAGE
function AddPostPagePlain ({
  posts,
  tempImage,
  isFetching,
  error,
  clearUrlPost,
  addPost
}: IProps){
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ slideIndex, setSlideIndex ] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (target: number) => () => {
    if (target === currentStep) return;
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
        closeOverlay={clearUrlPost}
        image={tempImage}
        confirmImage={addPost}
      />
      <div className="add-post-page__container">
        <div className="add-post-page__container__images scrollbar">
          {posts.length === 0 ? (
            <div className="add-post-page__container__images__plus">
              <PlusIcon color="white" size={5} onClick={scrollToInput} />
            </div>
          ) : (
            <ImageCarousel
              images={posts}
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
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
              slides={[ 'Images', 'Descriptions' ]}
            />
            <PostInput posts={posts} />

            <div className="add-post-page__container__content__content__actions">
              <button
                onClick={handleButtonClick(0)}
                className={`button${currentStep === 0
                  ? '--hide'
                  : ''} add-post-page__container__content__content__actions__prev`}>
                <AngleIcon color="white" />
              </button>
              <button
                onClick={handleButtonClick(1)}
                className={`button${currentStep === 1
                  ? '--hide'
                  : ''} add-post-page__container__content__content__actions__next`}>
                <AngleIcon rotate={180} color="white" />
              </button>
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
  clearUrlPost: () => dispatch(clearUrlPost()),
  addPost: (image: string) => dispatch(addPost({ image }))
});

const AddPostPage = connect(mapStateToProps, mapDispatchToProps)(
  AddPostPagePlain
);
export default AddPostPage;
