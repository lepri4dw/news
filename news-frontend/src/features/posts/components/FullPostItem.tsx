import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchFullPost} from "../postsThunks";
import {selectFullPost, selectFullPostLoading} from "../postsSlice";
import {Alert, Card, CircularProgress, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {apiURL} from "../../../constants";
import {deleteComment, fetchComments} from "../commentsThunks";
import {selectComments, selectCommentDeleting, selectCommentsFetching} from "../commentsSlice";
import {LoadingButton} from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentForm from "./CommentForm";

const FullPostItem = () => {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectFullPost);
  const fetchPostLoading = useAppSelector(selectFullPostLoading);
  const comments = useAppSelector(selectComments);
  const fetchCommentsLoading = useAppSelector(selectCommentsFetching);
  const deleteLoading = useAppSelector(selectCommentDeleting);

  const fetchPostWithComments = useCallback(async () => {
    await dispatch(fetchFullPost(id));
    await dispatch(fetchComments(id));
  }, [dispatch]);

  const onDelete = async (commentId: string) => {
    await dispatch(deleteComment(commentId));
    await dispatch(fetchComments(id));
  }

  useEffect(() => {
    void(fetchPostWithComments());
  }, [fetchPostWithComments]);

  return (
    <>
      {fetchPostLoading ? <CircularProgress/> : post &&
        <Grid container direction="column" spacing={2}>
          <Grid item style={{textAlign: 'center'}}>
            <Typography variant="h3">{post.title}</Typography>
            <p style={{color: '#ccc'}}>at {dayjs(post.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
          </Grid>
          {post.image && <Grid item style={{margin: '0 auto'}}>
            <img style={{width: '100%'}} alt={post.title} src={apiURL + '/' + post.image}/>
          </Grid>}
          <Grid item>
            <Typography>{post.content}</Typography>
          </Grid>
        </Grid>
      }
      <Grid container direction="column" spacing={2}>
        <Grid item sx={{mt: 2}}>
          <Typography variant="h4">Comments</Typography>
        </Grid>
        {fetchCommentsLoading ? <CircularProgress/> : comments.length > 0 ? comments.map(comment => (
          <Grid key={comment.id} item>
            <Card sx={{p: 2}}>
              <Grid container>
                <Grid item>
                  <Typography variant="h6"><b>{comment.author || 'Anonymous'}</b> wrote: {comment.text}</Typography>
                </Grid>
                <Grid item style={{marginLeft: 'auto'}}>
                  <LoadingButton variant="outlined" loading={id === deleteLoading} loadingPosition="start" startIcon={<DeleteIcon/>} onClick={() => onDelete(comment.id.toString())}>Delete</LoadingButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )) : <Alert severity="info">There are no comments, write your own!</Alert>}
      </Grid>
      <CommentForm post_id={id}/>
    </>

  );
};

export default FullPostItem;