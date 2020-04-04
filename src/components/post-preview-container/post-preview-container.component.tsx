import React, { Fragment } from 'react';
import PostPreview from '../post-preview/post-preview.component';
import './post-preview-container.styles.scss';
import { Post } from '../../@types/post.interfaces';
import ErrorMessage from '../error-message/error-message.component';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../loading/loading.component';

interface IProps {
  posts: Post[];
  noDataMessage: string;
  isFetching?: boolean;
  error?: string;
  fetchItem: () => void;
}

export default function PostPreviewContainer ({
  posts,
  noDataMessage,
  isFetching,
  fetchItem,
  error
}: IProps){
  return (
    <div className='post-preview-container'>
      {posts.length === 0 && !isFetching ? (
        <ErrorMessage message={noDataMessage} />
      ) : (
        <Fragment>
          <InfiniteScroll
            className='post-preview-container__content'
            dataLength={posts.length}
            next={fetchItem}
            hasMore={true}
            scrollThreshold='500px'
            loader={null}>
            {posts.map((post: Post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </InfiniteScroll>
          {isFetching ? (
            <Loading size={100} />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : null}
        </Fragment>
      )}
    </div>
  );
}
