import React, { ChangeEvent, useState } from 'react';
import './post-description-input.styles.scss';
import { connect } from 'react-redux';
import { GlobalState } from '../../../redux/root-reducer';
import { Dispatch } from 'redux';
import {
  changeDesc,
  changeTitle
} from '../../../redux/add-post/add-post.actions';
import CenterInput from '../../../components/center-input/center-input.component';

interface IProps {
  description: string;
  title: string;
  changeDesc: (desc: string) => void;
  changeTitle: (title: string) => void;
}

function validateTitle (title: string){
  if (title.length >= 15) return 'Title must be less than 15 characters';
  return '';
}

function PostDescriptionInputPlain ({
  description,
  title,
  changeDesc,
  changeTitle
}: IProps){
  const [ titleError, setTitleError ] = useState(validateTitle(title));

  const handleChangeDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeDesc(e.target.value);
  };
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const error = validateTitle(e.target.value);
    setTitleError(error);
    changeTitle(e.target.value);
  };

  return (
    <div className="post-description-input">
      <h1>Add your post details</h1>
      <span className="post-description-input__info">
        Tell your viewer the details of your design!
      </span>
      <CenterInput
        name="title"
        value={title}
        onChange={handleChangeTitle}
        label="Title"
        error={titleError}
        className="post-description-input__title"
      />
      <span className="post-description-input__title-info">
        Make short but catchy title! <span>(less than 15 characters)</span>
      </span>
      <CenterInput
        name="description"
        value={description}
        onChange={handleChangeDesc}
        label="Description"
        useTextarea
        className="post-description-input__desc"
      />
    </div>
  );
}

const mapStateToProps = ({ addPost: { description, title } }: GlobalState) => ({
  description,
  title
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeDesc: (desc: string) => dispatch(changeDesc(desc)),
  changeTitle: (title: string) => dispatch(changeTitle(title))
});

const PostDescriptionInput = connect(mapStateToProps, mapDispatchToProps)(
  PostDescriptionInputPlain
);
export default PostDescriptionInput;
