import React, { ChangeEvent } from 'react';
import Button from '../../../components/button/button.component';
import './post-input.styles.scss';
import useForm from '../../../effects/useForm.effect';
import { validateUrl } from '../../../utils/validations';
import { fetchApi } from '../../../redux/fetch/fetch.actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addTempPost } from '../../../redux/add-post/add-post.actions';
import CenterInput from '../../../components/center-input/center-input.component';

interface IProps {
  posts: string[];
  error?: string;
  addUrlPost: (url: string) => void;
  addTempPost: (url: string, file: File) => void;
}

function PostInputPlain ({ posts, addUrlPost, addTempPost, error }: IProps){
  const [ data, handleChange, handleSubmit, submitErrors ] = useForm(
    {
      url: {
        value: '',
        error: '',
        validation: validateUrl
      }
    },
    () => {
      addUrlPost(data.url.value);
      data.url.value = '';
    }
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    addTempPost(tempUrl, file);
  };

  const { url } = data;

  return (
    <div className="post-input">
      <div className="post-input__info">
        <h1>
          {posts.length === 0 ? (
            'Add images of your UI design!'
          ) : (
            `You have added ${posts.length} image${posts.length > 1 ? 's' : ''}`
          )}
        </h1>
        <span className="post-input__info__first-image-info">
          First image is the thumbnail for your post
        </span>
        <span>You can add {10 - posts.length} more image(s)</span>
      </div>
      <div className="post-input__input-url">
        <CenterInput
          label="Website URL"
          name="url"
          value={url.value}
          error={url.error}
          onChange={handleChange}
        />
        <span className="post-input__input-url__desc">
          Give us your website URL and we will take the screenshot of it for
          you!
          <span>&nbsp;(websites with vh units might behave strangely)</span>
        </span>
        <span className="post-input__input-url__error">
          {submitErrors || error}
        </span>
        <Button onClick={handleSubmit}>Take Screenshot</Button>
      </div>
      <div className="post-input__separator">
        <span>or</span>
      </div>
      <div className="post-input__input-file">
        <input
          type="file"
          name="image"
          id="file-input"
          onChange={handleFileChange}
        />
        <Button full>
          <label htmlFor="file-input">Choose File</label>
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addUrlPost: (url: string) =>
    dispatch(fetchApi({ name: 'ADD_URL_POST', data: { url } })),
  addTempPost: (url: string, file?: File) =>
    dispatch(addTempPost({ image: url, file }))
});

const PostInput = connect(null, mapDispatchToProps)(PostInputPlain);
export default PostInput;
