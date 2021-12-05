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

const lib = require('../../fetch');

export default function Posts(props) {
  // const groupId = props.groupId;
  // const [Page, setPage] = useState({
  //   id: '',
  //   name: '',
  //   admins: [''],
  //   members: [''],
  //   tags: '',
  //   visibility: true,
  //   posts: [
  //   {
  //     id: '',
  //     title: '',
  //     author: '',
  //     content: '',
  //   },
  //   ],
  // });

  // const showPage = async () => {

  // }
  async function showPosts() {
    ;
  }

  useEffect(() => {
    showPosts();
  }, []);


  return (

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
        title="CIS557 is really good"
        subheader="Nov 7, 2021"
      />
      <CardMedia
        component="img"
        height="194"
        image="/images/CIS557.png"
        alt="pic"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive pafun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.
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
  );
}
