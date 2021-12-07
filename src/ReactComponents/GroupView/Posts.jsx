import { React, useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';

const lib = require('../../fetch');

export default function Posts(props) {
  const { certainGroup } = props;

  async function deletePost(postId) {
    const res = await lib.deletePost(postId);
    window.location.reload();
  }

  async function flagPost(postId) {
    const res = await lib.flagPost(postId);
    window.location.reload();
  }

  // useEffect(() => { console.log('nothing'); }, [certainGroup]);
  const List = () => (
    certainGroup.posts.map((post) => (
      <Card key={post.id} sx={{ maxWidth: 700 }}>
        <CardHeader
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={post.title}
        // subheader="Nov 7, 2021"
        />
        <CardMedia
          component="img"
          height="194"
          image="/images/CIS557.png"
          alt="pic"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="flag" id="flag" onClick={flagPost(post.id)}>
            <AssistantPhotoIcon />
          </IconButton>
          <IconButton aria-label="delete" id="delete" onClick={deletePost(post.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    ))
  )

  return (
    <>
      {
        certainGroup &&
        (
          <List />
        )
      }
    </>
  );
}
