import React, { useEffect } from 'react';
import './detail-page.styles.scss';
import { match } from 'react-router-dom';
import { PostDetail } from '../../@types/post.interfaces';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchPostDetail } from '../../redux/post-detail/post-detail.actions';
import Loading from '../../components/loading/loading.component';
import PostDetailContainer from '../../components/post-detail-container/post-detail-container.component';

interface IProps {
  post: PostDetail | null;
  match: match<{ id: string }>;
  isFetching: boolean;
  fetchPostDetail: (id: string) => void;
}

function DetailPagePlain ({ post, fetchPostDetail, match, isFetching }: IProps){
  useEffect(
    () => {
      fetchPostDetail(match.params.id);
    },
    [ fetchPostDetail, match ]
  );

  // TODO: comments nya bkin ada id nya, supaya nanti kalo comment icon yang di home dipencet, dia sesuai hash pindah ke comments (#comments)
  // TODO: image carousel / grid (when clicked it becomes the biggest)
  return (
    <div className='detail-page'>
      {isFetching ? (
        <Loading />
      ) : post ? (
        <PostDetailContainer postDetail={post} />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state: GlobalState) => ({
  post: state.postDetail.postDetail,
  isFetching: state.postDetail.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPostDetail: (id: string) => {
    dispatch(fetchPostDetail(id));
  }
});

const DetailPage = connect(mapStateToProps, mapDispatchToProps)(
  DetailPagePlain
);

export default DetailPage;
