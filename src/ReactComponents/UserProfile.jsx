import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const lib = require('../fetch');

function UserProfile() {
  async function getProfile() {
    const usernameV = document.getElementById('username');
    const gender = document.getElementById('gender');
    const link = document.getElementById('link');
    const phone = document.getElementById('phone');
    const registerD = document.getElementById('register');

    const url = window.location.href;
    const urlList = url.split('/');
    const username = urlList.pop();
    const res = await lib.getProfile(username);
    if (res !== undefined) {
      usernameV.value = res.username;
      gender.value = res.gender;
      link.value = res.link;
      phone.value = res.phone;
      registerD.innerHTML += res.registerDate;
    }
  }

  const updateProfile = async () => {
    const gender = document.getElementById('gender');
    const link = document.getElementById('link');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    await lib.updateProfile(email.value, gender.value, phone.value, link.value);
  };

  const updatePwd = async () => {
    const pwd = document.getElementById('pwd');

    await lib.updatePwd(pwd.value);
  };

  const toGroupPage = () => {
    window.location.href = `${window.location.protocol}//${window.location.host}/groups`;
  };

  React.useEffect(async () => {
    getProfile();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Profile
            </Typography>
            <Button color="inherit" onClick={() => { toGroupPage(); }}>Back</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={2} md={3}>
          <Paper>
            <MenuList>
              <MenuItem>Personal Information</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>My Groups</MenuItem>
              <MenuItem>Friends</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={7} md={6}>
          <Stack spacing={2}>
            Personal Information
            <TextField id="email" label="Email" autoFocus />
            <TextField id="username" label="User Name" defaultValue=" " />
            <TextField variant="outlined" margin="normal" id="phone" label="Phone Number" defaultValue=" " />
            <TextField variant="outlined" margin="normal" id="link" label="Links" autoFocus defaultValue=" " />
            <TextField margin="normal" id="gender" label="Gender" autoFocus defaultValue=" " />
            <div id="register">Registration date: </div>
            <Button variant="contained" onClick={updateProfile}>Save</Button>
            <TextField margin="normal" id="pwd" label="password" autoFocus defaultValue=" " />
            <Button variant="contained" onClick={updatePwd}>Save</Button>
          </Stack>
        </Grid>
        <Grid item xs={2} md={2}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Username: xxx
              </Typography>
              <Typography variant="body2">
                ID: xxx
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
