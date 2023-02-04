import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchFullPost} from "../postsThunks";
import {selectFullPost} from "../postsSlice";
import {Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {apiURL} from "../../../constants";

const FullPostItem = () => {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectFullPost);

  useEffect(() => {
    dispatch(fetchFullPost(id));
  }, [dispatch]);

  return (
    <>
      {post &&
        <Grid container direction="column" spacing={2}>
          <Grid item style={{textAlign: 'center'}}>
            <Typography variant="h3">{post.title}</Typography>
            <p style={{color: '#ccc'}}>at {dayjs(post.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
          </Grid>
          {post.image && <Grid item style={{margin: '0 auto'}}>
            <img alt={post.title} src={apiURL + '/' + post.image}/>
          </Grid>}
          <Grid item>
            <Typography>{post.content}</Typography>
          </Grid>
        </Grid>
      }
    </>

  );
};

export default FullPostItem;