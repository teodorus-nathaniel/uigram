import React from 'react';
import CrossIcon from '../../../components/icons/cross/cross.compnent';
import CheckIcon from '../../../components/icons/check/check.component';
import './post-confirmation-modal.styles.scss';

interface IProps {
  image: string;
  file?: File;
  closeOverlay: () => void;
  confirmImage: (image: string, file?: File) => void;
}

export default function PostConfirmationOverlay ({
  image,
  file,
  closeOverlay,
  confirmImage
}: IProps){
  return (
    <div className={`post-confirmation-overlay${image === '' ? '--hide' : ''}`}>
      <div className="post-confirmation-overlay__image scrollbar">
        <img src={image} alt="post" />
      </div>
      <div
        className="post-confirmation-overlay__confirm"
        onClick={closeOverlay}>
        <div className="post-confirmation-overlay__confirm__content">
          <h1>Do you want to use this image?</h1>
          <div className="post-confirmation-overlay__confirm__content__actions">
            <div className="post-confirmation-overlay__confirm__content__actions__no">
              <CrossIcon color="white" size={3} />
              <button onClick={closeOverlay} />
            </div>
            <div className="post-confirmation-overlay__confirm__content__actions__yes">
              <CheckIcon color="#00a3ff" size={3} />
              <button onClick={() => confirmImage(image, file)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
