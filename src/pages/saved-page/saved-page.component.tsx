import React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import PostPreviewContainer from '../../components/post-preview-container/post-preview-container.component';
import { Post } from '../../@types/post.interfaces';
import './saved-page.styles.scss';

interface IProps {
  savedPosts: Post[];
}

function SavedPagePlain ({ savedPosts }: IProps){
  return (
    <div className='saved-page'>
      <h2 className='heading'>Saved posts</h2>
      <PostPreviewContainer posts={savedPosts} />
    </div>
  );
}

const mapStateToProps = ({ savedPosts: { savedPosts } }: GlobalState) => ({
  savedPosts
});

const SavedPage = connect(mapStateToProps)(SavedPagePlain);
export default SavedPage;
