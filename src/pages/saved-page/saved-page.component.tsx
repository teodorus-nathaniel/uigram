import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './saved-page.styles.scss';
import { Dispatch } from 'redux';
import { fetchSavedPosts } from '../../redux/saved-posts/saved-posts.actions';
import Loading from '../../components/loading/loading.component';

interface IProps {
  savedPosts: Post[];
  isFetching: boolean;
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
      {isFetching ? <Loading /> : <PostPreviewContainer posts={savedPosts} />}
    </div>
  );
}

const mapStateToProps = ({
  savedPosts: { savedPosts, isFetching }
}: GlobalState) => ({
  savedPosts,
  isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSavedPosts: () => dispatch(fetchSavedPosts())
});

const SavedPage = connect(mapStateToProps, mapDispatchToProps)(SavedPagePlain);
export default SavedPage;
