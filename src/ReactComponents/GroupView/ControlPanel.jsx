import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { React } from 'react';
import {
  addAdmin, inviteUser, leaveGroup, removeAdmin
} from '../../api';

export default function ControlPanel(props) {
  const { groupName } = props;
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = data.get('input');
    console.log(input);
    console.log(groupName);
    await addAdmin(groupName, input);
  };
  const handleDeleteAdmin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = data.get('input');
    console.log(input);
    await removeAdmin(groupName, input);
  };
  const handleInviteUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = data.get('input');
    console.log(input);
    await inviteUser(groupName, input);
  };
  const handleLeave = async () => {
    console.log('prepare to leave');
    await leaveGroup(groupName);
    // window.location.href = "http://localhost:3000/groups";
  };

  const addPost = () => {
    let url = window.location.href;
    if (url.charAt(url.length - 1) === '/') {
      url = url.slice(0, -1);
    }
    console.log(window.location.href);
    window.location.href = `${url}/post`;
  };

  return (
    <Grid item xs={4} md={6} container spacing={1}>
      <Box component="form" onSubmit={handleAddAdmin} noValidate sx={{ mt: 2 }}>
        <TextField name="input" placeholder="addAdmin" />
        <Button variant="contained" type="submit">Add Admin</Button>
      </Box>
      <Box component="form" onSubmit={handleDeleteAdmin} noValidate sx={{ mt: 1 }}>
        <TextField name="input" placeholder="deleteAdmin" />
        <Button variant="contained" type="submit">Delete Admin</Button>
      </Box>
      <Box component="form" onSubmit={handleInviteUser} noValidate sx={{ mt: 1 }}>
        <TextField name="input" placeholder="userName" />
        <Button variant="contained" type="submit">Invite</Button>
      </Box>
      <Button variant="contained" type="submit" onClick={addPost}>Add Post</Button>
      <Button variant="contained" onClick={handleLeave}>Leave</Button>

    </Grid>
  );
}
