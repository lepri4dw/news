import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullPost, Post, PostMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const response = await axiosApi.get<Post[]>('/posts');
    return response.data;
  }
);

export const fetchFullPost = createAsyncThunk<FullPost, string>(
  'posts/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/posts/' + id);
    return response.data;
  }
);

export const createPost = createAsyncThunk<void, PostMutation>(
  'posts/create',
  async (postMutation) => {
    const formData = new FormData();
    const keys = Object.keys(postMutation) as (keyof PostMutation)[];

    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/posts', formData);
  }
);

export const deletePost = createAsyncThunk<void, number>(
  'posts/delete',
  async (id) => {
    await axiosApi.delete('/posts/' + id);
  }
)