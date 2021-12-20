import React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

export default function Header(props) {
  const toUserPage = (whoami) => {
    window.location.href = window.location.protocol + "//" + window.location.host + `/user/${whoami}`;
  }

  const toMain = () => {
    window.location.href = window.location.protocol + "//" + window.location.host + `/groups`;
  }

  const toCreateGroup = () => {
    window.location.href = window.location.protocol + "//" + window.location.host + `/createGroup`;
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        {/* <Link href={`/user/${props.userName}`} variant="body2"> */}
        <Button id="btn3" style={{color:"white"}} onClick={() => {toMain()}}>{'Back to Main'}</Button>
        <Button id="btn2" style={{color:"white"}} onClick={() => {toCreateGroup()}}>{'Create a Group'}</Button>
        <Button id="btn1" style={{color:"white"}} onClick={() => {toUserPage(props.userName)}}>{`User: ${props.userName}`}</Button>
        {/* </Link> */}
      </Toolbar>
    </AppBar>
  );
}
