import React from 'react';
import './comment-textarea.styles.scss';
import Button from '../button/button.component';

interface IProps {
  placeholder?: string;
  buttonText?: string;
}

export default function CommentTextArea ({ placeholder, buttonText }: IProps){
  return (
    <div className='comment-textarea'>
      <textarea placeholder={placeholder || 'add a comment...'} rows={3} />
      <Button>{buttonText || 'Comment'}</Button>
    </div>
  );
}
