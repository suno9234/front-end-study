import { fork, delay, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostAPI(data) {
  return axios.post('/api/addPost');
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI,action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`);
}

function* addComment(action) {
  try {
    // const result = yield call(addPostAPI,action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchPost),
    fork(watchComment),
  ]);
}
