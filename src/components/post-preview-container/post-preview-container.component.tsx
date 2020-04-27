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
  noFollowButton?: boolean;
  fetchItem: () => void;
}

export default function PostPreviewContainer ({
  posts,
  noDataMessage,
  isFetching,
  fetchItem,
  error,
  noFollowButton
}: IProps){
  return (
    <div className="post-preview-container">
      {posts.length === 0 && !isFetching && !error ? (
        <ErrorMessage message={noDataMessage} size={2} />
      ) : (
        <Fragment>
          <InfiniteScroll
            className="post-preview-container__content"
            dataLength={posts.length}
            next={fetchItem}
            hasMore={true}
            scrollThreshold="500px"
            loader={null}>
            {posts.map((post: Post) => (
              <PostPreview
                noFollowButton={noFollowButton}
                key={post.id}
                post={post}
              />
            ))}
          </InfiniteScroll>
          {isFetching ? (
            <Loading size={100} />
          ) : error ? (
            <ErrorMessage size={1.3} message={error} />
          ) : null}
        </Fragment>
      )}
    </div>
  );
}
