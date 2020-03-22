import React, { useState } from 'react';
import { User } from '../../@types/user.interfaces';
import TabLayout from '../tab-layout/tab-layout.component';
import './user-content.styles.scss';

interface IProps {
  user: User;
}

const tabs = [ 'Posts', 'Following', 'Followers' ];
// const components = []

export default function UserContent ({ user }: IProps){
  const [ activeTab, setActiveTab ] = useState(0);
  // const Component = components[activeTab];

  return (
    <div className='user-content'>
      <TabLayout
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* {<Component />} */}
    </div>
  );
}
