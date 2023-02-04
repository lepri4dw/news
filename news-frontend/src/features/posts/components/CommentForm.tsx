import React, {useState} from 'react';
import {Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {createComment, fetchComments} from "../commentsThunks";
import {LoadingButton} from "@mui/lab";
import {selectCommentCreating} from "../commentsSlice";

interface Props {
  post_id: string;
}

const CommentForm: React.FC<Props> = ({post_id}) => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCommentCreating);
  const [state, setState] = useState({
    author: '',
    text: ''
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createComment({
      ...state,
      post_id: parseFloat(post_id),
    }));
    await dispatch(fetchComments(post_id));
    setState(prev => {
      return {
        ...prev,
        text: ''
      }
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  return ( 
    <form onSubmit={submitFormHandler} style={{marginTop: '20px'}}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Add comment</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="author" label="Author"
            value={state.author}
            onChange={inputChangeHandler}
            name="author"
          />
        </Grid>
        <Grid item>
          <TextField
            id="text" label="Text"
            value={state.text}
            onChange={inputChangeHandler}
            name="text" required
          />
        </Grid>
        <Grid item>
          <LoadingButton loading={createLoading} loadingIndicator="Loading…" type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;