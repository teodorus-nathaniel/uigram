import React, { useState, ChangeEvent } from 'react';
import './comment-textarea.styles.scss';
import Button from '../button/button.component';
import { GlobalState } from '../../redux/root-reducer';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { connect } from 'react-redux';

interface IProps {
  postId: string;
  placeholder?: string;
  buttonText?: string;
  isFetching?: boolean;
  error?: string;
  addNewComment: (postId: string, content: string) => void;
}

function CommentTextAreaPlain ({
  placeholder,
  buttonText,
  postId,
  isFetching,
  error,
  addNewComment
}: IProps){
  const [ comment, setComment ] = useState('');
  const [ localError, setLocalError ] = useState('');
  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(value);
  };

  return (
    <div className="comment-textarea">
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder={placeholder || 'add a comment...'}
        rows={3}
      />
      <div className="comment-textarea__action">
        <Button
          disabled={isFetching}
          onClick={() => {
            if (!comment) {
              setLocalError("Comment can't be empty");
              return;
            }
            if (!isFetching) addNewComment(postId, comment);
          }}>
          {buttonText || 'Comment'}
        </Button>
        <span className="comment-textarea__action__error">
          {localError || error}
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = ({
  fetchController: { errors, isFetching }
}: GlobalState) => ({
  isFetching: isFetching.ADD_NEW_COMMENT,
  error: errors.ADD_NEW_COMMENT
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNewComment: (postId: string, content: string) =>
    dispatch(fetchApi({ name: 'ADD_NEW_COMMENT', data: { postId, content } }))
});

const CommentTextarea = connect(mapStateToProps, mapDispatchToProps)(
  CommentTextAreaPlain
);
export default CommentTextarea;
