import React, { useCallback , useState }  from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form , Input , Checkbox ,Button} from 'antd';
import useInput from '../hooks/useInput';

import styled from 'styled-components';
const ErrorMessage = styled.div`
    color: red;
`;

const Signup = () => {
    const [id,onChangeId] = useInput('');
    const [nickname,onChangeNickName] = useInput('');
    const [password,onChangePassword] = useInput('');

    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !==password);
    },[password]);
    
    const [term,setTerm] = useState('');
    const [termError,setTermError] = useState(false);
    const onChangeTerm = useCallback((e)=>{
        setTerm(e.target.checked);
        setTermError(false);
    },[]);
    
    const onSubmit = useCallback(() => {
        if(password!== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log(id,nickname,password);
    }, [password, passwordCheck,term]);
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-id'>아이디</label>
                    <br></br>
                    <Input name='user-id' value={id} required onChange={onChangeId}></Input>
                </div>
                <div>
                    <label htmlFor='user-nickname'>닉네임</label>
                    <br></br>
                    <Input name='user-nickname' value={nickname} required onChange={onChangeNickName}></Input>
                </div>
                <div>
                    <label htmlFor='user-password'>비밀번호</label>
                    <br></br>
                    <Input name='user-password' value={password} required onChange={onChangePassword}></Input>
                </div>
                <div>
                    <label htmlFor='user-psasword-check'>비밀번호체크</label>
                    <br></br>
                    <Input
                        name="user-password-check"
                        type='password'
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name='user-term' checked= {term} onChange={onChangeTerm}>머시기를 동의합니다.</Checkbox>
                    {termError && <div style={{color:'red'}}>약관에 동의하셔야 됩니다.</div>}
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>

    )
}
export default Signup;