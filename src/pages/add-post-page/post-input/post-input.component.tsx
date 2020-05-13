import React from 'react';
import InputField from '../../../components/input-field/input-field.component';
import Button from '../../../components/button/button.component';
import './post-input.styles.scss';
import AngleIcon from '../../../components/icons/angle/angle.component';

interface IProps {
  posts: string[];
}

export default function PostInput ({ posts }: IProps){
  return (
    <div className="post-input">
      <div className="post-input__info">
        <h1>
          You have added {posts.length} image{posts.length > 1 ? 's' : ''}
        </h1>
        <span className="post-input__info__first-image-info">
          First image is the thumbnail for your post
        </span>
        <span>You can add {10 - posts.length} more image(s)</span>
      </div>
      <div className="post-input__input-url">
        <InputField label="Website URL" name="url" />
        <span className="post-input__input-url__desc">
          Give us your website URL and we will take the screenshot of it for
          you!
        </span>
        <Button>Take Screenshot</Button>
      </div>
      <div className="post-input__separator">
        <span>or</span>
      </div>
      <div className="post-input__input-file">
        <input type="file" name="image" id="file-input" />
        <Button>
          <label htmlFor="file-input">Choose File</label>
        </Button>
      </div>
    </div>
  );
}
