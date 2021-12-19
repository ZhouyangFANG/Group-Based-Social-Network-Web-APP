import React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

export default function Header(props) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* <Link href={`/user/${props.userName}`} variant="body2"> */}
            {`User: ${props.userName}`}
          {/* </Link> */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
