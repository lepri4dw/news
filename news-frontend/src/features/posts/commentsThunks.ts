import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Comment, CommentMutation} from "../../types";

export const fetchComments = createAsyncThunk<Comment[], string | undefined>(
  'comments/fetchAll',
  async (postId) => {
    let baseUrl = '/comments';

    if (postId) {
      baseUrl += '?post_id=' + postId;
    }

    const response = await axiosApi.get<Comment[]>(baseUrl);
    return response.data;
  }
);

export const createComment = createAsyncThunk<void, CommentMutation>(
  'comments/create',
  async (commentMutation) => {
    await axiosApi.post('/comments', commentMutation);
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  }
);