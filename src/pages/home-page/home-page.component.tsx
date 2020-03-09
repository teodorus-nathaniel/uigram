import React from 'react';
import PostPreviewContainer from './../../components/post-preview-container/post-preview-container.component';
import './home-page.styles.scss';
import TabLayout from '../../components/tab-layout/tab-layout.component';

export default function HomePage (){
  return (
    <div className='home-page'>
      <TabLayout tabs={[ 'Your Feeds', 'Explore' ]} />
      <PostPreviewContainer />
    </div>
  );
}
