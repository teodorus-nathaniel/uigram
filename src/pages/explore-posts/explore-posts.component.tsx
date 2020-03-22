import React, { useEffect, useState } from 'react';
import { GlobalState } from '../../redux/root-reducer';
import PostActionAPI from '../../redux/post/post.actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './explore-posts.styles.scss';
import ErrorMessage from '../../components/error-message/error-message.component';
import Loading from '../../components/loading/loading.component';
import usePrevious from '../../effects/usePrevious.effect';

interface IProps {
  explore: Post[];
  isFetching: boolean;
  error: Error | null;
  fetchExplorePosts: (sort: string) => void;
}

function ExplorePostsPlain ({
  explore,
  isFetching,
  fetchExplorePosts,
  error
}: IProps){
  const [ sort, setSort ] = useState('date');
  const prevSort = usePrevious(sort);

  useEffect(
    () => {
      if (explore.length === 0 || prevSort !== sort) fetchExplorePosts(sort);
    },
    [ fetchExplorePosts, sort, explore, prevSort ]
  );

  return (
    <div className='explore-posts'>
      <div className='explore-posts__sort-container'>
        <span>Sort by: </span>
        <select onChange={({ target: { value } }) => setSort(value)}>
          <option value='date'>Date</option>
          <option value='like'>Most Liked</option>
        </select>
      </div>
      {isFetching ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <PostPreviewContainer posts={explore} />
      )}
    </div>
  );
}

const mapStateToProps = ({
  post: { explore, isFetching, error }
}: GlobalState) => ({
  explore,
  isFetching,
  error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchExplorePosts: (sort: string) =>
    dispatch(PostActionAPI.fetchPosts({ type: 'explore', sort }))
});

const ExplorePosts = connect(mapStateToProps, mapDispatchToProps)(
  ExplorePostsPlain
);
export default ExplorePosts;
