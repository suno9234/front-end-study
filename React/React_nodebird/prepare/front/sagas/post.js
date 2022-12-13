import { fork , delay, put, takeLatest, all } from "redux-saga/effects";

function addPostAPI(data) {
    return axios.post('/api/addPost');
}

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data
        });
    } catch (err){
        yield put({
            type:'ADD_POST_FAILURE',
            data:err.response.data
        })
    }

}

function* watchPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga(){
    yield all([
        fork(watchPost),
    ])
}