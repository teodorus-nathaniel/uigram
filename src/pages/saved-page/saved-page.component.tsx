import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './saved-page.styles.scss';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';

interface IProps {
  savedPosts: Post[];
  isFetching?: boolean;
  page: number;
  error?: string;
  fetchSavedPosts: (page: number) => void;
}

function SavedPagePlain ({
  savedPosts,
  isFetching,
  fetchSavedPosts,
  error,
  page
}: IProps){
  useEffect(
    () => {
      if (isFetching || error) return;
      fetchSavedPosts(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="saved-page">
      <h2 className="heading">Saved posts</h2>
      <PostPreviewContainer
        isFetching={isFetching}
        posts={savedPosts}
        noDataMessage={`You haven't bookmarked any ui design`}
        fetchItem={() => fetchSavedPosts(page + 1)}
        error={error}
      />
    </div>
  );
}

const mapStateToProps = ({
  savedPosts: { savedPosts },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  savedPosts: savedPosts.posts,
  page: savedPosts.page,
  isFetching: isFetching.SAVED_POSTS,
  error: errors.SAVED_POSTS
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSavedPosts: (page: number) =>
    dispatch(fetchApi({ name: 'SAVED_POSTS', data: { page } }))
});

const SavedPage = connect(mapStateToProps, mapDispatchToProps)(SavedPagePlain);
export default SavedPage;
