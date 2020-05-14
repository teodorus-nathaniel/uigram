import React, { ChangeEvent, useState } from 'react';
import './post-link-input.styles.scss';
import Button from '../../../components/button/button.component';
import InputField from '../../../components/input-field/input-field.component';
import useForm from '../../../effects/useForm.effect';
import { validateUrl } from '../../../utils/validations';
import { GlobalState } from '../../../redux/root-reducer';
import { Dispatch } from 'redux';
import { changeLink } from '../../../redux/add-post/add-post.actions';
import { connect } from 'react-redux';

interface IProps {
  link: string;
  changeLink: (link: string) => void;
}

function PostLinkInputPlain ({ link, changeLink }: IProps){
  const [ submitError, setSubmitError ] = useState('');
  const [ linkError, setLinkError ] = useState(validateUrl(link));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkError(validateUrl(e.target.value));
    changeLink(e.target.value);
  };

  const handleSubmit = () => {
    const error = validateUrl(link);
    setSubmitError(error);

    if (error) return;
    console.log('ACCEPTED');
  };

  return (
    <div className="post-link-input">
      <h1>Tell us your design link</h1>
      <span className="post-link-input__info">
        Input relevant link to see your design (optional)
      </span>
      <InputField
        label="Link"
        name="link"
        value={link}
        errorMessage={linkError}
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
  changeLink: (link: string) => dispatch(changeLink(link))
});

const PostLinkInput = connect(mapStateToProps, mapDispatchToProps)(
  PostLinkInputPlain
);
export default PostLinkInput;
