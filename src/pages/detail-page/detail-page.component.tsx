import React, { useEffect } from 'react';
import './detail-page.styles.scss';
import { match } from 'react-router-dom';
import { PostDetail } from '../../@types/post.interfaces';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import LoadingError from '../../components/loading-error/loading-error.component';
import ImageCarousel from '../../components/image-carousel/image-carousel.component';
import PostDetails from '../../components/post-details/post-details.component';
import useFetchCleanup from '../../effects/useFetchCleanup.effect';

interface IProps {
  post: PostDetail | null;
  match: match<{ id: string }>;
  isFetching?: boolean;
  error?: string;
  fetchPostDetail: (id: string) => void;
}

function DetailPagePlain ({
  post,
  fetchPostDetail,
  match,
  isFetching,
  error
}: IProps){
  useFetchCleanup('POST_DETAIL');

  useEffect(
    () => {
      const { id } = match.params;
      if (isFetching || error || (post && post.id === id)) return;

      fetchPostDetail(id);
    },
    [ fetchPostDetail, match, isFetching, error, post ]
  );

  return (
    <div className="detail-page">
      <LoadingError isLoading={isFetching} error={error}>
        {post ? (
          <div className="post-detail-container">
            <div className="images-container scrollbar">
              <ImageCarousel images={post.images} />
            </div>
            <PostDetails post={post} />
          </div>
        ) : null}
      </LoadingError>
    </div>
  );
}

const mapStateToProps = ({
  postDetail: { postDetail },
  fetchController: { errors, isFetching }
}: GlobalState) => ({
  post: postDetail,
  isFetching: isFetching.POST_DETAIL,
  error: errors.POST_DETAIL
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPostDetail: (id: string) =>
    dispatch(fetchApi({ name: 'POST_DETAIL', data: { id } }))
});

const DetailPage = connect(mapStateToProps, mapDispatchToProps)(
  DetailPagePlain
);

export default DetailPage;
