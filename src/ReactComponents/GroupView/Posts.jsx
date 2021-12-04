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
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Posts(props) {
  const { certainGroup } = props;

  useEffect(() => { console.log(certainGroup.posts); }, [certainGroup]);

  return (
    <>
      {
        certainGroup && (
          certainGroup.posts.map((post) => {
            <Card sx={{ maxWidth: 700 }}>
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
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          })
        )
      }
    </>
  );
}
