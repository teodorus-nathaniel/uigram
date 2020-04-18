import React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import { User } from '../../@types/user.interfaces';
import { Post } from '../../@types/post.interfaces';
import PostPreviewContainer from '../post-preview-container/post-preview-container.component';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { useRouteMatch } from 'react-router-dom';

interface IProps {
  isFetching?: boolean;
  error?: string;
  user: { data: User | null; posts: { page: number; data: Post[] } };
  fetchUserPosts: (id: string, page: number, self?: boolean) => void;
}

function UserPostsPlain ({ user, isFetching, error, fetchUserPosts }: IProps){
  const match = useRouteMatch<{ id: string }>();

  return (
    <PostPreviewContainer
      posts={user.posts.data}
      noDataMessage='Share your first post!'
      fetchItem={() =>
        fetchUserPosts(
          user.data!.id,
          user.posts.page + 1,
          match.params.id === 'self'
        )}
      isFetching={isFetching}
      error={error}
    />
  );
}

const mapStateToProps = ({
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  isFetching: isFetching.FETCH_USER_POSTS,
  errors: isFetching.FETCH_USER_POSTS
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserPosts: (id: string, page: number, self?: boolean) =>
    dispatch(fetchApi({ name: 'FETCH_USER_POSTS', data: { id, page, self } }))
});

const UserPosts = connect(mapStateToProps, mapDispatchToProps)(UserPostsPlain);
export default UserPosts;
