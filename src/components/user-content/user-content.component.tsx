import React, { useState, useEffect } from 'react';
import { User } from '../../@types/user.interfaces';
import TabLayout from '../tab-layout/tab-layout.component';
import './user-content.styles.scss';
import { Post } from '../../@types/post.interfaces';
import UserPosts from './user-posts.component';
import UserFollowers from './user-followers.component';
import UserFollowing from './user-following.component';
import useHash from '../../effects/useHash.effect';

interface IProps {
  user: { data: User | null; posts: { page: number; data: Post[] } };
}

const tabs = [ 'Posts', 'Following', 'Followers' ];
const components = [ UserPosts, UserFollowing, UserFollowers ];

export default function UserContent ({ user }: IProps){
  const [ hash, setHash ] = useHash();
  const [ activeTab, setActiveTab ] = useState(0);
  const Component = components[activeTab];

  console.log(hash);

  useEffect(
    () => {
      let tab = tabs.findIndex((val) => val.toLowerCase() === hash);
      if (tab === -1) tab = 0;
      setActiveTab(tab);
    },
    [ hash ]
  );

  const handleChangeTab = (tab: number) => {
    setHash(tabs[tab].toLowerCase());
    setActiveTab(tab);
  };

  return (
    <div className="user-content">
      <TabLayout
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleChangeTab}
      />
      <Component user={user} />
    </div>
  );
}
