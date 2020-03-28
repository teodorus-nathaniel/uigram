import React from 'react';
import PostPreview from '../post-preview/post-preview.component';
import './post-preview-container.styles.scss';
import { Post } from '../../@types/post.interfaces';
import LoadingError from '../loading-error/loading-error.component';
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
      <LoadingError isLoading={isFetching} error={error}>
        {posts.length === 0 ? (
          <ErrorMessage message={noDataMessage} />
        ) : (
          <div className='post-preview-container__content'>
            {posts.map((post: Post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        )}
      </LoadingError>
    </div>
  );
}
