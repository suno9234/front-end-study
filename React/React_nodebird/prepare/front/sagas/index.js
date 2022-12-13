import { all, fork} from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';


export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ])
}



















// LOG_IN 액션이 들어오면 logIn 함수를 실행
    // 일종의 이벤트리스너 같은 역할
    // put ~= dispatch
    // call = 함수 실행
    // fork = 함수 실행
    // fork = 비동기 함수 호출
    // call = 동기 함수 호출 (await 이랑 비슷)

//yield take('LOG_OUT_REQUEST' , logOut);
    // take = 한번 사용되면 없어짐
    // takeEvery = 계속 남아 있음 ~= 이벤트리스너 ~= while(true){yield take()랑 비슷(동기<->비동기)}
    
    //yield takeEvery('LOG_OUT_REQUEST' , logOut);
    // takeEvery = 두번누르면 두번 실행
    
    // takeLatest = 동시(다다다다닥) 입력 차단
    // 응답을 취소하는거지 요청을 취소하는게 아님
    // 서버쪽에서 확인해야됨 

    // throttle => 요청도 차단시킴
    // 프론트 takelatset -> 백에서 확인 //  throttle은 dos공격 막기 위하여 사용