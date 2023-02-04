import {configureStore} from "@reduxjs/toolkit";
import { postsReducer } from '../features/posts/postsSlice';
import {commentsReducer} from "../features/posts/commentsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;