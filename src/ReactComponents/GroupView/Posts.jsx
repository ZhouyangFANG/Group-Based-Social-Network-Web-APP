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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

  async function hidePost(postId) {
    const res = await lib.hidePost(postId);
    if (res === 200) {
      window.location.reload();
    }
  }

  async function addComment(postId) {
    const content = document.getElementById(`comment${postId}`).value;
    const res = await lib.addComment(postId, content);
    if (res === 200) {
      window.location.reload();
    }
  }

  async function deleteComment(commentId) {
    const res = await lib.deleteComment(commentId);
    if (res === 200) {
      window.location.reload();
    } else {
      alert("You cannot delete this comment");
    }
  }

  function sortCommentTime() {
    return function (objectN, objectM) {
      const valueN = objectN.time;
      const valueM = objectM.time;
      if (valueN < valueM) return 1;
      else if (valueN > valueM) return -1;
      else return 0;
    }
  }

  const Comments = ({ comment }) => {
    if (comment.deleted) {
      return null;
    }
    return (
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.username}: {comment.content}
        </Typography>
        <Button variant='contained' type="submit" onClick={() => { deleteComment(comment.id) }}>Delete</Button>
      </CardContent>
    );
  }

  function MapCommentList(commentL) {
    commentL.sort(sortCommentTime());
    return commentL.map((comment) => <Comments comment={comment} key={comment.id} />);
  }

  function MapList() {
    return certainGroup.posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {
      switch (post.attachmentType) {
        case "null":
          console.log("only text post");
          return (<PostCard1 post={post} key={post.id} />);
        case "image":
          console.log("text and image post");
          return (<PostCard2 post={post} key={post.id} />);
        case "audio":
          console.log("text and audio post");
          return (<PostCard3 post={post} key={post.id} />);
        case "video":
          console.log("text and video post");
          return (<PostCard4 post={post} key={post.id} />);


      }
    });
  }

  useEffect(async () => {
    const url = window.location.href;
    let urlList = url.split('/');
    const groupName = urlList.pop();

    const hide = await lib.getHiddenList(groupName);
    sethiddenPosts(hide);
  }, []);

  const PostCard1 = ({ post }) => {
    for (var i = 0; i < hiddenPosts.length; i++) {
      if (hiddenPosts[i].postId === post.id) {
        return null;
      }
    };

    if (post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="flagdelete" onClick={() => { deletePost(post.id) }}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton aria-label="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else if (!post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="hide" id="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else {
      return null;
    }
  }

  const PostCard2 = ({ post }) => {
    for (var i = 0; i < hiddenPosts.length; i++) {
      if (hiddenPosts[i].postId === post.id) {
        return null;
      }
    };

    if (post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
            <img src={post.attachment} />
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="flagdelete" onClick={() => { deletePost(post.id) }}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton aria-label="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else if (!post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
            <img src={post.attachment} />
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="hide" id="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else {
      return null;
    }
  }

  const PostCard3 = ({ post }) => {
    for (var i = 0; i < hiddenPosts.length; i++) {
      if (hiddenPosts[i].postId === post.id) {
        return null;
      }
    };

    if (post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
            <audio controls autoPlay>
              <source src={post.attachment} />
            </audio>
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="flagdelete" onClick={() => { deletePost(post.id) }}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton aria-label="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else if (!post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
            <audio controls autoPlay>
              <source src={post.attachment} />
            </audio>
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="hide" id="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else {
      return null;
    }
  }

  const PostCard4 = ({ post }) => {
    for (var i = 0; i < hiddenPosts.length; i++) {
      if (hiddenPosts[i].postId === post.id) {
        return null;
      }
    };

    if (post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
            <video controls autoplay>
              <source src={post.attachment} />
            </video>
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="flagdelete" onClick={() => { deletePost(post.id) }}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <IconButton aria-label="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
        </Card>
      )
    } else if (!post.flagger && !post.deleted) {
      return (
        <Card key={post.id} sx={{ maxWidth: 500 }}>
          <CardHeader title={post.title} subheader={'Author: '+post.author} />
          <CardContent id="container">
            <Typography variant="body2" color="text.secondary">
              {post.postContent}
            </Typography>
            <video controls autoplay>
              <source src={post.attachment} />
            </video>
          </CardContent>
          <TextField id={`comment${post.id}`} label="add comment" name="add comment" />
          <CardActions disableSpacing>
            <IconButton aria-label="addComment" onClick={() => { addComment(post.id) }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="flag" id="flag" onClick={() => { flagPost(post.id) }}>
              <AssistantPhotoIcon />
            </IconButton>
            <IconButton aria-label="delete" id="delete" onClick={() => { deletePost(post.id) }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="hide" id="hide" onClick={() => { hidePost(post.id) }}>
              <ThreeSixtyIcon />
            </IconButton>
          </CardActions>
          <div>
            {MapCommentList(post.comments)}
          </div>
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
