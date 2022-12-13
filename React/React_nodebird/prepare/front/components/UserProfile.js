import React ,{useCallback} from 'react';
import { Card, Avatar ,Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const onLogOut = useCallback(()=>{
        dispatch(logoutRequestAction());
    },[]);
    const {me , isLoggingOut} = useSelector((state) => state.user);
    return (
        <Card
            actions={[
                <div key="twit">짹짹<br></br>0</div>,
                <div key="followings">팔로잉<br></br>0</div>,
                <div key="followers">팔로워<br></br>0</div>,
            ]}
        >

            <Card.Meta
                avatar={<Avatar>{me?.nickname[0]}</Avatar>}
                title={me?.nickname}
            ></Card.Meta>
            <Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
        </Card>
    )
}


export default UserProfile;