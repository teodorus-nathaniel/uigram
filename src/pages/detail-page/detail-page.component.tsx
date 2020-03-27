import React, { useEffect } from 'react';
import './detail-page.styles.scss';
import { match } from 'react-router-dom';
import { PostDetail } from '../../@types/post.interfaces';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PostDetailContainer from '../../components/post-detail-container/post-detail-container.component';
import { fetchApi } from '../../redux/fetch/fetch.actions';

interface IProps {
  post: PostDetail | null;
  match: match<{ id: string }>;
  isFetching?: boolean;
  error?: Error | null;
  fetchPostDetail: (id: string) => void;
}

function DetailPagePlain ({
  post,
  fetchPostDetail,
  match,
  isFetching,
  error
}: IProps){
  useEffect(
    () => {
      fetchPostDetail(match.params.id);
    },
    [ fetchPostDetail, match ]
  );

  // FIXME: keknya mendingan langsung disini biar ga prop tunneling
  // TODO: comments nya bkin ada id nya, supaya nanti kalo comment icon yang di home dipencet, dia sesuai hash pindah ke comments (#comments)
  // TODO: image carousel / grid (when clicked it becomes the biggest)
  return (
    <div className='detail-page'>
      <PostDetailContainer
        postDetail={post}
        isFetching={isFetching}
        error={error}
      />
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
