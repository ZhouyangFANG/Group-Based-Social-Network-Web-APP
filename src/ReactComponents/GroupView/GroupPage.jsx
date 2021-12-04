import { Link as RouterLink, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { getGroupList, 
  addAdmin, 
  removeAdmin, 
  requestToJoinGroup, inviteUser, leaveGroup, filterGroupsByTags, getGroupPage } from '../../api';
import Header from '../Header';
import Posts from './Posts';

// const lib = require('../../fetch');

const theme = createTheme();

export default function GroupPage() {

  const userName = 'FakeName';

  const param = useParams();
  const groupId = param.groupId;
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = data.get("input");
    console.log(input);
    await addAdmin(groupId, input);
  }
  const handleDeleteAdmin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = data.get("input");
    console.log(input);
    await removeAdmin(groupId, input);
  }
  const handleInviteUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = data.get("input");
    console.log(input);
    await inviteUser(groupId, input);
  }
  const handleLeave = async () => {
    await leaveGroup(groupId, userName);
  }

  function addPost() {
    let url = window.location.href;
    url += "/post";
    window.location.href = url;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Header title={groupId} />
        <Grid container spacing={2}>
          <Grid item xs={2} md={3}>
            <Paper style={{ position: 'fixed' }}>
              <MenuList>
                <MenuItem component={RouterLink} to="/user">Personal Information</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>My Groups</MenuItem>
                <MenuItem>Friends</MenuItem>
                <MenuItem onClick={addPost}>Add A Post</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xs={8} md={5}>
            <Posts groupId={groupId}/>
          </Grid>
          <Grid item xs={2} md={2} container spacing={1}>
            <Box component="form" onSubmit={handleAddAdmin} noValidate sx={{ mt: 1 }}>
              <TextField name="input" placeholder="addAdmin" />
              <Button variant='contained' type="submit">Add to Admin</Button>
            </Box>
            <Box component="form" onSubmit={handleDeleteAdmin} noValidate sx={{ mt: 1 }}>
              <TextField name="input" placeholder="deleteAdmin" />
              <Button variant='contained' type="submit">Delete Admin</Button>
            </Box>
            <Box component="form" onSubmit={handleInviteUser} noValidate sx={{ mt: 1 }}>
              <TextField name="input" placeholder="userName" />
              <Button variant='contained' type="submit">Invite</Button>
            </Box>
            <Button variant='contained' type="submit" onClick={handleLeave}>Leave</Button>
          </Grid>
        </Grid>
      </>
    </ThemeProvider>
  );
}
