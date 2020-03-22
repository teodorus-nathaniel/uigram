import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './saved-page.styles.scss';
import { Dispatch } from 'redux';
import SavedPostActionAPI from '../../redux/saved-posts/saved-posts.actions';

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
      <PostPreviewContainer
        isFetching={isFetching}
        posts={savedPosts}
        noDataMessage={`When you post your design, it will appear on your profile`}
      />
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
  fetchSavedPosts: () => dispatch(SavedPostActionAPI.fetchSavedPosts())
});

const SavedPage = connect(mapStateToProps, mapDispatchToProps)(SavedPagePlain);
export default SavedPage;
