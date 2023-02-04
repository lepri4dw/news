import React, { useState } from 'react';
import { PostMutation } from '../../../types';
import { Grid, TextField } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPostsCreating } from '../postsSlice';
import { createPost } from '../postsThunks';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const PostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectPostsCreating);
  const [state, setState] = useState<PostMutation>({
    title: '',
    content: '',
    image: null
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createPost(state));
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };
  console.log(2);
  return (
    <form autoComplete="off" onSubmit={submitFormHandler} style={{margin: '0 16px'}}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="content" label="Content"
            value={state.content}
            onChange={inputChangeHandler}
            name="content" multiline rows={4}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image"
          />
        </Grid>
        <Grid item xs>
          <LoadingButton loading={createLoading} loadingIndicator="Loading…" type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;