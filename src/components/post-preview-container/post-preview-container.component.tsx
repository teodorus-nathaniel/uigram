import React from 'react';
import PostPreview from '../post-preview/post-preview.component';
import './post-preview-container.styles.scss';
import { Post } from '../../@types/post.interfaces';
import Loading from '../loading/loading.component';
import ErrorMessage from '../error-message/error-message.component';

interface IProps {
  posts: Post[];
  noDataMessage: string;
  isFetching?: boolean;
  error?: Error | null;
}

export default function PostPreviewContainer ({
  posts,
  noDataMessage,
  isFetching,
  error
}: IProps){
  return (
    <div className='post-preview-container'>
      {isFetching ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : posts.length === 0 ? (
        <ErrorMessage message={noDataMessage} />
      ) : (
        posts.map((post: Post) => <PostPreview key={post.id} post={post} />)
      )}
    </div>
  );
}
