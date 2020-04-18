import React, { useState } from 'react';
import { User } from '../../@types/user.interfaces';
import TabLayout from '../tab-layout/tab-layout.component';
import './user-content.styles.scss';
import { Post } from '../../@types/post.interfaces';
import UserPosts from './user-posts.component';

interface IProps {
  user: { data: User | null; posts: { page: number; data: Post[] } };
}

const tabs = [ 'Posts', 'Following', 'Followers' ];
// const components = [ PostPreviewContainer ];

export default function UserContent ({ user }: IProps){
  const [ activeTab, setActiveTab ] = useState(0);

  return (
    <div className='user-content'>
      <TabLayout
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <UserPosts user={user} />
    </div>
  );
}
