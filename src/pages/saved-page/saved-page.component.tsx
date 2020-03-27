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
  error?: Error | null;
  fetchSavedPosts: () => void;
}

function SavedPagePlain ({ savedPosts, isFetching, fetchSavedPosts }: IProps){
  useEffect(
    () => {
      fetchSavedPosts();
    },
    [ fetchSavedPosts ]
  );

  return (
    <div className='saved-page'>
      <h2 className='heading'>Saved posts</h2>
      <PostPreviewContainer
        isFetching={isFetching}
        posts={savedPosts}
        noDataMessage={`When you post your design, it will appear on your profile`}
      />
    </div>
  );
}

const mapStateToProps = ({
  savedPosts: { savedPosts },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  savedPosts,
  isFetching: isFetching.SAVED_POSTS,
  error: errors.SAVED_POSTS
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSavedPosts: () => dispatch(fetchApi({ name: 'SAVED_POSTS' }))
});

const SavedPage = connect(mapStateToProps, mapDispatchToProps)(SavedPagePlain);
export default SavedPage;
