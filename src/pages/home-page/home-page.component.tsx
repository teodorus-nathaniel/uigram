import React, { useState } from 'react';
import './home-page.styles.scss';
import TabLayout from '../../components/tab-layout/tab-layout.component';
import FeedsPosts from '../feeds-posts/feeds-posts.component';
import ExplorePosts from '../explore-posts/explore-posts.component';

const tabNames = [ 'Your Feeds', 'Explore' ];
const Components = [ FeedsPosts, ExplorePosts ];

export default function HomePage (){
  const [ activeTab, setActiveTab ] = useState(0);

  const Component = Components[activeTab];

  return (
    <div className='home-page'>
      <TabLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabNames}
      />
      {<Component />}
    </div>
  );
}
