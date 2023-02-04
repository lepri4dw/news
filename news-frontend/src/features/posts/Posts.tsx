import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsFetching } from './postsSlice';
import { fetchPosts } from './postsThunks';
import PostItem from './components/PostItem';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsLoading = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Posts
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        {postsLoading ? <CircularProgress sx={{pl: 2}}/> : posts.map(post => (
          <PostItem key={post.id} title={post.title} createdAt={post.createdAt} image={post.image} id={post.id}/>
        ))}
      </Grid>
    </Grid>
  );
};

export default Posts;