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
    const url = window.location.href;
    const urlList = url.split('/');
    urlList.pop();
    let newUrl = '';
    for (let i = 0; i < urlList.length; i += 1) {
      newUrl = `${newUrl}${urlList[i]}/`;
    }
    newUrl = `${newUrl}user/${whoami}`;
    window.location.href = newUrl;
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        {/* <Link href={`/user/${props.userName}`} variant="body2"> */}
        <Button id="btn1" style={{color:"white"}} onClick={() => {toUserPage(props.userName)}}>{`User: ${props.userName}`}</Button>
        {/* </Link> */}
      </Toolbar>
    </AppBar>
  );
}
