import React, { ReactElement, useRef, useEffect, Fragment } from 'react';
import './post-loading-modal.styles.scss';
import { GlobalState } from '../../../redux/root-reducer';
import { connect } from 'react-redux';
import Loading from '../../../components/loading/loading.component';
import CheckCircleIcon from '../../../components/icons/check-circle/check-circle.component';
import CrossCircleIcon from '../../../components/icons/cross-circle/cross-circle.component';
import { useHistory } from 'react-router-dom';

interface Props {
  isFetching?: boolean;
  error?: string;
}

function PostLoadingModalPlain ({ isFetching, error }: Props): ReactElement{
  const hasUploaded = useRef(false);
  const history = useHistory();
  useEffect(
    () => {
      if (isFetching && !hasUploaded.current) hasUploaded.current = true;
    },
    [ isFetching ]
  );

  useEffect(
    () => {
      if (hasUploaded.current && !isFetching && !error) {
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    },
    [ isFetching, error, history ]
  );

  return (
    <div
      className={`post-loading-modal${isFetching || hasUploaded.current
        ? ''
        : '--hide'}`}>
      <div>
        {isFetching ? (
          <Fragment>
            <Loading />
            <h2>Please wait while we process your post...</h2>
          </Fragment>
        ) : error ? (
          <Fragment>
            <CrossCircleIcon className="finished-icon error" size={10} />
            <h2>{error}</h2>
          </Fragment>
        ) : (
          <Fragment>
            <CheckCircleIcon className="finished-icon success" size={10} />
            <h2>Your post have successfully created!</h2>
          </Fragment>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({
  fetchController: {
    errors: { POST_NEW_POST: error },
    isFetching: { POST_NEW_POST: isFetching }
  }
}: GlobalState) => ({
  isFetching,
  error
});

const PostLoadingModal = connect(mapStateToProps)(PostLoadingModalPlain);
export default PostLoadingModal;
