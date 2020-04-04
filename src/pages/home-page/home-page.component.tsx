import React, { useState, Fragment } from 'react';
import './home-page.styles.scss';
import TabLayout from '../../components/tab-layout/tab-layout.component';
import FeedsPosts from '../feeds-posts/feeds-posts.component';
import ExplorePosts from '../explore-posts/explore-posts.component';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { User } from '../../@types/user.interfaces';

const tabNames = [ 'Your Feeds', 'Explore' ];
const Components = [ FeedsPosts, ExplorePosts ];

interface IProps {
  user: User | null;
}

function HomePagePlain ({ user }: IProps){
  const [ activeTab, setActiveTab ] = useState(0);

  const Component = Components[activeTab];

  return (
    <div className='home-page'>
      {user ? (
        <Fragment>
          <TabLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabNames}
          />
          {<Component />}
        </Fragment>
      ) : (
        <ExplorePosts />
      )}
    </div>
  );
}

const mapStateToProps = ({ user: { self: { data } } }: GlobalState) => ({
  user: data
});

const HomePage = connect(mapStateToProps)(HomePagePlain);
export default HomePage;
