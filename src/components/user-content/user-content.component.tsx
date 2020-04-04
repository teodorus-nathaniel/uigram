import React, { useState } from 'react';
import { User } from '../../@types/user.interfaces';
import TabLayout from '../tab-layout/tab-layout.component';
import './user-content.styles.scss';
import PostPreviewContainer from '../post-preview-container/post-preview-container.component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { Post } from '../../@types/post.interfaces';
import { useRouteMatch } from 'react-router-dom';

interface IProps {
  user: { data: User | null; posts: { page: number; data: Post[] } };
  fetchUserPosts: (id: string, page: number, self?: boolean) => void;
}

const tabs = [ 'Posts', 'Following', 'Followers' ];
const components = [ PostPreviewContainer ];

function UserContentPlain ({ user, fetchUserPosts }: IProps){
  const [ activeTab, setActiveTab ] = useState(0);
  const Component = components[activeTab];
  const match = useRouteMatch<{ id: string }>();

  console.log(user.posts.page);

  return (
    <div className='user-content'>
      <TabLayout
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {
        <Component
          posts={user.posts.data}
          noDataMessage='Share your first post!'
          fetchItem={() =>
            fetchUserPosts(
              user.data!.id,
              user.posts.page + 1,
              match.params.id === 'self'
            )}
        />
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserPosts: (id: string, page: number, self?: boolean) =>
    dispatch(fetchApi({ name: 'FETCH_USER_POSTS', data: { id, page, self } }))
});

const UserContent = connect(null, mapDispatchToProps)(UserContentPlain);
export default UserContent;
