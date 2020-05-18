import React, { ChangeEvent, useState } from 'react';
import './post-link-input.styles.scss';
import Button from '../../../components/button/button.component';
import { validateUrlOrEmpty } from '../../../utils/validations';
import { GlobalState } from '../../../redux/root-reducer';
import { Dispatch } from 'redux';
import { changeLink } from '../../../redux/add-post/add-post.actions';
import { connect } from 'react-redux';
import { fetchApi } from '../../../redux/fetch/fetch.actions';
import CenterInput from '../../../components/center-input/center-input.component';

interface IProps {
  link: string;
  isFetching?: boolean;
  error?: string;
  changeLink: (link: string) => void;
  postNewPost: () => void;
}

function PostLinkInputPlain ({ link, changeLink, postNewPost }: IProps){
  const [ submitError, setSubmitError ] = useState('');
  const [ linkError, setLinkError ] = useState(validateUrlOrEmpty(link));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkError(validateUrlOrEmpty(e.target.value));
    changeLink(e.target.value);
  };

  const handleSubmit = () => {
    const error = validateUrlOrEmpty(link);
    setSubmitError(error);

    if (error) return;
    postNewPost();
  };

  return (
    <div className="post-link-input">
      <h1>Tell us your design link</h1>
      <span className="post-link-input__info">
        Input relevant link to see your design <span>(optional)</span>
      </span>
      <CenterInput
        label="Link"
        name="link"
        value={link}
        error={linkError}
        onChange={handleChange}
      />
      <span className="post-link-input__error">{submitError}</span>
      <Button onClick={handleSubmit}>Create Post!</Button>
    </div>
  );
}

const mapStateToProps = ({ addPost: { link } }: GlobalState) => ({
  link
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeLink: (link: string) => dispatch(changeLink(link)),
  postNewPost: () => dispatch(fetchApi({ name: 'POST_NEW_POST' }))
});

const PostLinkInput = connect(mapStateToProps, mapDispatchToProps)(
  PostLinkInputPlain
);
export default PostLinkInput;
