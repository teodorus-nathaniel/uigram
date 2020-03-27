import React from 'react';
import { PostDetail } from '../../@types/post.interfaces';
import './post.detail-container.styles.scss';
import PostDetails from '../post-details/post-details.component';
import Loading from '../loading/loading.component';
import ImageCarousel from '../image-carousel/image-carousel.component';

interface IProps {
  postDetail: PostDetail | null;
  isFetching?: boolean;
  error?: Error | null;
}

export default function PostDetailContainer ({
  postDetail,
  isFetching
}: IProps){
  return isFetching ? (
    <Loading />
  ) : postDetail ? (
    <div className='post-detail-container'>
      <div className='images-container scrollbar'>
        <ImageCarousel images={postDetail.images} />
      </div>
      <PostDetails post={postDetail} />
    </div>
  ) : null;
}
