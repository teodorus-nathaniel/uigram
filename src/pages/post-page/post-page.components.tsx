import React, { useEffect, useState, Fragment } from 'react';
import { GlobalState } from '../../redux/root-reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { User } from '../../@types/user.interfaces';
import { useHistory } from 'react-router-dom';
import SlideBar from '../../components/slide-bar/slide-bar.components';
import postPageStore from '../login-page/post-page.store';
import PostImage from '../../components/post-image/post-image.components';
import PostDescriptionContainer from '../../components/post-description-container/post-description-container.components';

interface IProps {
  self: { data: User | null };
}

const slideNames = [ 'Images', 'Description' ];
const Components = [ PostImage, PostDescriptionContainer ];

function PostPagePlain ({ self }: IProps){
  const history = useHistory();
  const [ activeSlide, setActiveSlide ] = useState(0);
  const [ images, setImages ] = useState([
    {
      preview: '',
      raw: 'test'
    }
  ]);

  useEffect(
    () => {
      if (!self.data) history.push('/login');
    },
    [ self.data, history ]
  );

  const [ error, setError ] = useState('');

  const setSlide = async (nav: string) => {
    setError('');
    if (nav === 'next') {
      if (images.length > 0 && images[0].raw !== 'test') {
        setActiveSlide(activeSlide + 1);
        setError('');
      } else setError('Please choose image, at least one image');
    } else if (nav === 'prev') setActiveSlide(activeSlide - 1);
  };

  const Component = Components[activeSlide];

  return (
    <div>
      <Fragment>
        {/* <SlideBar
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          slides={slideNames}
          saveState={postPageStore.saveTabState}
          getSavedState={postPageStore.getTabState}
        /> */}
        {
          <Component
            activeSlide={activeSlide}
            setSlide={setSlide}
            images={images}
            setImages={setImages}
            error={error}
          />
        }
      </Fragment>
    </div>
  );
}

const mapStateToProps = ({
  user: { self },
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  self: self
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const PostPage = connect(mapStateToProps, mapDispatchToProps)(PostPagePlain);

export default PostPage;
