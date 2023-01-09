import React, { useState, useCallback } from 'react';
import { Card, Popover, Button, Avatar, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { me } = useSelector((state) => state.user);
  const id = me?.id;
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images?.[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User?.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                  </>
                ) : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {
        commentFormOpened && (
          <div>
            <CommentForm post={post} />
            <List
              header={`${post.Comments.length}개의 댓글`}
              itemLayout="horizontal"
              dataSource={post.Comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                  />
                </li>
              )}
            />

          </div>
        )
      }
      {/* <CommentForm></CommentForm>
            <Comments></Comments> */}
    </div>
  );
};

PostCard.propTypes = {
  post: propTypes.shape({
    id: propTypes.number,
    User: propTypes.object,
    content: propTypes.string,
    createdAt: propTypes.string,
    Comments: propTypes.arrayOf(propTypes.any),
    Images: propTypes.arrayOf(propTypes.any),
    Likers: propTypes.arrayOf(propTypes.object),
  }).isRequired,
};

export default PostCard;
