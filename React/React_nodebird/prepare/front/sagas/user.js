import { fork ,takeLatest , throttle, put , all , delay} from "redux-saga/effects";

function logInAPI(data) {
    return axios.post('/api/login');
}

function* logIn(action) {
    try {
        console.log('sagalogin');
        console.log(action);
        //const result = yield call(logInAPI,action.data);
        yield delay(1000);
        
        
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data
        });
    } catch (err){
        yield put({
            type:'LOG_IN_FAILURE',
            data:err.response.data
        })
    }

}

function logoutAPI() {
    return axios.post('/api/logout');
}

function* logOut(action) {
    try {
        console.log('logout-saga');
        //const result = yield call(logoutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: action.data
        });
    } catch (err){
        yield put({
            type:'LOG_OUT_FAILURE',
            data:err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}
function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST' , logOut);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
    ])
}