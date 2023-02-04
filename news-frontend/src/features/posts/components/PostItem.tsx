import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deletePost, fetchPosts } from '../postsThunks';
import { LoadingButton } from '@mui/lab';
import { selectPostsDeleting } from '../postsSlice';

interface Props {
  title: string;
  createdAt: string;
  image: string | null;
  id: number;
}

const MessageItem: React.FC<Props> = ({title, createdAt, image, id}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectPostsDeleting);
  const onDelete = async () => {
    await dispatch(deletePost(id));
    await dispatch(fetchPosts());
  };

  return (
    <Grid item xs={12} sm={12} md={6} sx={{height: '100%'}}>
      <Card>
       <Grid container>
          <Grid item xs={3} sx={{p: 2}}>
            {<img width="100" height="100" alt={title} src={image ? apiURL + '/' + image : noImageAvailable} />}
          </Grid>
          <Grid item xs={9} sx={{pt: 2}}>
            <Typography variant='h5'>{title}</Typography>
            <Grid container sx={{marginTop: 'auto'}}>
              <Typography sx={{mt: 1}}>at {dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss')}</Typography>
              <Button endIcon={<ArrowForwardIcon/>}>Read Full Post</Button>
              <LoadingButton variant="outlined" loading={id === deleteLoading} loadingPosition="start" startIcon={<DeleteIcon/>} onClick={onDelete}>Delete</LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default MessageItem;