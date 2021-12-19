import React, { Component, useState, useEffect } from 'react';
import TablePagination from "@material-ui/core/TablePagination";
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
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const lib = require('../../fetch');

export default function Posts(props) {
  const { certainGroup } = props;
  const [hiddenPosts, sethiddenPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function deletePost(postId) {
    const res = await lib.deletePost(postId);
    if (res === 200) {
      window.location.reload();
    } else {
      alert("unauthorized!");
    }
  }

  async function flagPost(postId) {
    const res = await lib.flagPost(postId);
    if (res === 200) {
      window.location.reload();
    }
  }

  async function hidePost(postId){
    const res = await lib.hidePost(postId);
    if (res === 200) {
      window.location.reload();
    }
  }

  function MapList() {
    return certainGroup.posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => <PostCard post={post} key={post.id} />);
  }

  useEffect(async () => {
    const url = window.location.href;
    let urlList = url.split('/');
    const groupName = urlList.pop();

    const hide = await lib.getHiddenList(groupName);
    sethiddenPosts(hide);
  }, []);

  const PostCard = ({post}) => {
    for (var i = 0; i < hiddenPosts.length; i++) {
      if (hiddenPosts[i].postId === post.id){
        return null;
      }
    };

    if (post.flagger && !post.deleted) {
      return (
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
            )}/>
          <CardMedia
            component="img"
            height="194"
            image="/images/CIS557.png"
            alt="pic"/>
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => {flagPost(post.id)}}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => {deletePost(post.id)}}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="flagdelete" onClick={() => {deletePost(post.id)}}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton aria-label="hide" onClick={() => {hidePost(post.id)}}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
        </Card>
      )
    } else if (!post.flagger && !post.deleted){
      return (
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
            title={post.title}/>
          <CardMedia
            component="img"
            height="194"
            image="/images/CIS557.png"
            alt="pic"/>
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => {flagPost(post.id)}}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => {deletePost(post.id)}}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="hide" id="hide" onClick={() => {hidePost(post.id)}}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
        </Card>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      {
        certainGroup &&
        (
          <div>
            <div>
              {MapList()}
            </div>
            <div>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={certainGroup.posts.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
          </div>
        )
      }
    </>
  );
}
