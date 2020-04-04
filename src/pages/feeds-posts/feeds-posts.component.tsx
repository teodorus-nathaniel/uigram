import React, { useEffect } from 'react';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { GlobalState } from '../../redux/root-reducer';
import { Dispatch } from 'redux';
import './feeds-posts.styles.scss';
import { connect } from 'react-redux';
import { Post } from '../../@types/post.interfaces';
import { fetchApi } from '../../redux/fetch/fetch.actions';

interface IProps {
  feeds: Post[];
  isFetching?: boolean;
  error?: string;
  page: number;
  fetchFeedsPosts: (page: number) => void;
}

function FeedsPostsPlain ({
  feeds,
  isFetching,
  page,
  fetchFeedsPosts,
  error
}: IProps){
  useEffect(
    () => {
      if (feeds.length === 0) fetchFeedsPosts(page + 1);
    },
    [ fetchFeedsPosts, feeds, page ]
  );

  return (
    <div className='feeds-posts'>
      <h2 className='heading'>Welcome, User</h2>
      <PostPreviewContainer
        posts={feeds}
        isFetching={isFetching}
        error={error}
        fetchItem={() => fetchFeedsPosts(page + 1)}
        noDataMessage={`There is no one that you follow yet\nExplore others' works through explore tab`}
      />
    </div>
  );
}

const mapStateToProps = ({
  post: { feeds },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  feeds: feeds.posts,
  page: feeds.page,
  isFetching: isFetching.FEEDS,
  error: errors.FEEDS
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFeedsPosts: (page: number) => {
    console.log({ page });
    dispatch(fetchApi({ name: 'FEEDS', data: { page } }));
  }
});

const FeedsPosts = connect(mapStateToProps, mapDispatchToProps)(
  FeedsPostsPlain
);
export default FeedsPosts;
