import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useInView } from 'react-intersection-observer';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const [ref, inView] = useInView();

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1]?.id,
        data: tag,
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
      {<div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />}
    </AppLayout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.params.tag,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});
export default Hashtag;
