import React, { useEffect, useState } from 'react';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './explore-posts.styles.scss';
import usePrevious from '../../effects/usePrevious.effect';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { clearExplorePosts } from '../../redux/post/post.actions';

interface IProps {
  explore: Post[];
  sortBy?: string;
  page: number;
  isFetching?: boolean;
  error?: string;
  fetchExplorePosts: (sort: string, page: number) => void;
  clearExplorePosts: () => void;
}

function ExplorePostsPlain ({
  explore,
  sortBy,
  page,
  isFetching,
  fetchExplorePosts,
  clearExplorePosts,
  error
}: IProps){
  const [ sort, setSort ] = useState(sortBy || 'timestamp');
  const prevSort = usePrevious(sort);

  useEffect(
    () => {
      if (isFetching || error) return;
      if (
        (explore.length === 0 && page === 0) ||
        (prevSort !== sort && prevSort)
      ) {
        fetchExplorePosts(sort, 1);
      }
    },
    [ fetchExplorePosts, sort, explore, prevSort, page, isFetching, error ]
  );

  return (
    <div className="explore-posts">
      <div className="explore-posts__sort-container">
        <span>Sort by: </span>
        <select
          onChange={({ target: { value } }) => {
            setSort(value);
            clearExplorePosts();
          }}
          defaultValue={sort}>
          <option value="timestamp">Date</option>
          <option value="likesCount">Most Liked</option>
        </select>
      </div>
      <PostPreviewContainer
        fetchItem={() => fetchExplorePosts(sort, page + 1)}
        posts={explore}
        error={error}
        isFetching={isFetching}
        noDataMessage={`No one have posted :(`}
      />
    </div>
  );
}

const mapStateToProps = ({
  post: { explore },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  explore: explore.posts,
  page: explore.page,
  sortBy: explore.sort,
  isFetching: isFetching.EXPLORE,
  error: errors.EXPLORE
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchExplorePosts: (sort: string, page: number) => {
    dispatch(fetchApi({ name: 'EXPLORE', data: { sort, page } }));
  },
  clearExplorePosts: () => dispatch(clearExplorePosts())
});

const ExplorePosts = connect(mapStateToProps, mapDispatchToProps)(
  ExplorePostsPlain
);
export default ExplorePosts;
