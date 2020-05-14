import React, { ChangeEvent } from 'react';
import './post-description-input.styles.scss';
import { connect } from 'react-redux';
import { GlobalState } from '../../../redux/root-reducer';
import { Dispatch } from 'redux';
import { changeDesc } from '../../../redux/add-post/add-post.actions';

interface IProps {
  description: string;
  changeDesc: (desc: string) => void;
}

function PostDescriptionInputPlain ({ description, changeDesc }: IProps){
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeDesc(e.target.value);
  };

  return (
    <div className="post-description-input">
      <h1>Add your post description</h1>
      <span className="post-description-input__info">
        Tell your viewer the details of your design!
      </span>
      <textarea
        name="desc"
        value={description}
        onChange={handleChange}
        placeholder="No description is also fine..."
      />
    </div>
  );
}

const mapStateToProps = ({ addPost: { description } }: GlobalState) => ({
  description
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeDesc: (desc: string) => dispatch(changeDesc(desc))
});

const PostDescriptionInput = connect(mapStateToProps, mapDispatchToProps)(
  PostDescriptionInputPlain
);
export default PostDescriptionInput;
