import { FullPost, Post } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPost, deletePost, fetchFullPost, fetchPosts } from './postsThunks';

interface PostsState {
  items: Post[],
  fetchLoading: boolean,
  fullPostItem: FullPost | null;
  fetchOnePostLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | number;
}

const initialState: PostsState = {
  items: [],
  fetchLoading: false,
  fullPostItem: null,
  fetchOnePostLoading: false,
  createLoading: false,
  deleteLoading: false
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetchLoading = false;
      state.items = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchFullPost.pending, (state) => {
      state.fetchOnePostLoading = true;
    });
    builder.addCase(fetchFullPost.fulfilled, (state, {payload: post}) => {
      state.fetchOnePostLoading = false;
      state.fullPostItem = post;
    });
    builder.addCase(fetchFullPost.rejected, (state) => {
      state.fetchOnePostLoading = true;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deletePost.pending, (state, {meta: {arg: postId}}) => {
      state.deleteLoading = postId;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectFullPost = (state: RootState) => state.posts.fullPostItem;
export const selectPostsFetching = (state: RootState) => state.posts.fetchLoading;
export const selectFullPostLoading = (state: RootState) => state.posts.fetchOnePostLoading;
export const selectPostsCreating = (state: RootState) => state.posts.createLoading;
export const selectPostsDeleting = (state: RootState) => state.posts.deleteLoading;