import React, { useState, useEffect } from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';
import { connect } from 'react-redux';
import { GlobalState } from '../../../redux/root-reducer';
import { Post } from '../../../@types/post.interfaces';
import { Dispatch } from 'redux';

interface IBookmarkProps extends IProps {
  savedPosts: Post[];
  dispatch: Dispatch;
}

function BookmarkIconPlain ({
  savedPosts,
  dispatch,
  ...otherProps
}: IBookmarkProps){
  const [ isAnimating, setIsAnimating ] = useState(false);

  useEffect(
    () => {
      console.log('object');
      setIsAnimating(true);
    },
    [ savedPosts ]
  );

  return (
    <Icon
      viewBox='0 0 24 24'
      {...otherProps}
      onAnimationEnd={() => setIsAnimating(false)}
      className={isAnimating ? 'animate' : ''}>
      <path
        d='M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z'
        fill='currentColor'
      />
    </Icon>
  );
}

const mapStateToProps = ({ savedPosts: { savedPosts } }: GlobalState) => ({
  savedPosts
});

const BookmarkIcon = connect(mapStateToProps)(BookmarkIconPlain);

export default BookmarkIcon;
