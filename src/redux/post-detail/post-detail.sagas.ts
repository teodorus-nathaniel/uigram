import { all, takeLatest, put, call } from "redux-saga/effects";
import {
    FETCH_POST_DETAIL,
    fetchPostDetailFailure
} from "./post-detail.actions";
import catchAsync from "../utils/catch-async";
import { loadPostDetail } from "./post-detail.actions";
import { dummyPostDetail } from "../../dummy-datas/dummy-datas";

function* fetchPostDetailAsync({ payload }: { payload: string }) {
    console.log(payload);
    yield new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
    yield put(loadPostDetail(dummyPostDetail));
}

function* watchFetchPostDetail() {
    yield takeLatest(
        FETCH_POST_DETAIL,
        catchAsync(fetchPostDetailAsync, fetchPostDetailFailure)
    );
}

export default function* postDetailSagas() {
    yield all([call(watchFetchPostDetail)]);
}
