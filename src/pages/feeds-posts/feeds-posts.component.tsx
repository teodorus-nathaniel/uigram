import React, { useEffect } from 'react';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { GlobalState } from '../../redux/root-reducer';
import PostActionAPI from '../../redux/post/post.actions';
import { Dispatch } from 'redux';
import './feeds-posts.styles.scss';
import { connect } from 'react-redux';
import { Post } from '../../@types/post.interfaces';

interface IProps {
  feeds: Post[];
  isFetching: boolean;
  error: Error | null;
  fetchFeedsPosts: () => void;
}

function FeedsPostsPlain ({
  feeds,
  isFetching,
  fetchFeedsPosts,
  error
}: IProps){
  useEffect(
    () => {
      if (feeds.length === 0) fetchFeedsPosts();
    },
    [ fetchFeedsPosts, feeds ]
  );

  return (
    <div className='feeds-posts'>
      <h2 className='heading'>Welcome, User</h2>
      <PostPreviewContainer
        posts={feeds}
        isFetching={isFetching}
        error={error}
        noDataMessage={`There is no one that you follow yet\nExplore others' works through explore tab`}
      />
    </div>
  );
}

const mapStateToProps = ({
  post: { feeds, isFetching, error }
}: GlobalState) => ({
  feeds,
  isFetching,
  error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFeedsPosts: () => dispatch(PostActionAPI.fetchPosts({ type: 'feeds' }))
});

const FeedsPosts = connect(mapStateToProps, mapDispatchToProps)(
  FeedsPostsPlain
);
export default FeedsPosts;
