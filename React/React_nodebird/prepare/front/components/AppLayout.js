import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux'

import UserProfile from '../components/UserProfile'
import LoginForm from '../components/LoginForm'

const SearchInput = styled(Input.Search)`
    verticalAlign: "middle"
`;

const Global = createGlobalStyle`
 .ant-row{
    margin-right:0 !important;
    margin-left: 0 !important;
 }
 .ant-col:first-child{
    padding-left:0 !important;
 }
 .ant-col:last-child{
    padding-right: 0 !important;
 }
`
const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
        <div>
            <Global></Global>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton></SearchInput>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile ></UserProfile> : <LoginForm></LoginForm>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href='https://www.naver.com' target="_blank" rel='noreferrer noopener'>Made by Suno</a>
                </Col>
            </Row>

        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;