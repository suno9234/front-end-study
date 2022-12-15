import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: id,
      },
    });
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} />
        <Button stlye={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit" loading={addCommentLoading}>삐약</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: propTypes.object.isRequired,
};

export default CommentForm;
