import React, { useEffect, useState } from 'react';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './explore-posts.styles.scss';
import usePrevious from '../../effects/usePrevious.effect';
import { fetchApi } from '../../redux/fetch/fetch.actions';

interface IProps {
  explore: Post[];
  sortBy?: string;
  isFetching?: boolean;
  error?: Error | null;
  fetchExplorePosts: (sort: string) => void;
}

function ExplorePostsPlain ({
  explore,
  sortBy,
  isFetching,
  fetchExplorePosts,
  error
}: IProps){
  const [ sort, setSort ] = useState(sortBy || 'date');
  const prevSort = usePrevious(sort);

  useEffect(
    () => {
      if (explore.length === 0 || (prevSort !== sort && prevSort))
        fetchExplorePosts(sort);
    },
    [ fetchExplorePosts, sort, explore, prevSort ]
  );

  return (
    <div className='explore-posts'>
      <div className='explore-posts__sort-container'>
        <span>Sort by: </span>
        <select
          onChange={({ target: { value } }) => setSort(value)}
          defaultValue={sort}>
          <option value='date'>Date</option>
          <option value='like'>Most Liked</option>
        </select>
      </div>
      <PostPreviewContainer
        posts={explore}
        error={error}
        isFetching={isFetching}
        noDataMessage={`No one have posted :(`}
      />
    </div>
  );
}

const mapStateToProps = ({
  post: { explore, exploreSort },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  explore,
  sortBy: exploreSort,
  isFetching: isFetching.EXPLORE,
  error: errors.EXPLORE
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchExplorePosts: (sort: string) =>
    dispatch(fetchApi({ name: 'EXPLORE', data: { sort } }))
});

const ExplorePosts = connect(mapStateToProps, mapDispatchToProps)(
  ExplorePostsPlain
);
export default ExplorePosts;
