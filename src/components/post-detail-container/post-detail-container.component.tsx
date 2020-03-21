import React from 'react';
import { PostDetail } from '../../@types/post.interfaces';
import './post.detail-container.styles.scss';
import PostDetails from '../post-details/post-details.component';

interface IProps {
  postDetail: PostDetail;
}

export default function PostDetailContainer ({ postDetail }: IProps){
  const { images } = postDetail;

  return (
    <div className='post-detail-container'>
      <div className='images-container scrollbar'>
        <img src={images[0]} alt='' />
      </div>
      <PostDetails post={postDetail} />
    </div>
  );
}
