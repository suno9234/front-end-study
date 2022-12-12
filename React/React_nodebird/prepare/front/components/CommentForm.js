import { Form, Input , Button } from 'antd'
import {useCallback} from 'react';
import useInput from '../hooks/useInput';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
    const id = useSelector((state)=>state.user.me?.id);
    const [commentText,onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(()=>{
        console.log(post.id,commentText);
    },[commentText]);
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea value = {commentText} onChange={onChangeCommentText}></Input.TextArea>
                <Button stlye = {{position:'absolute' ,right:0 , bottom:-40}} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes={
    post:propTypes.object.isRequired,
}

export default CommentForm;