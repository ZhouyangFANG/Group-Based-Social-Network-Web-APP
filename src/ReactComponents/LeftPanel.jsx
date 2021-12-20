import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function LeftPanel() {
  return (
    <Grid item xs={2} md={3}>
      <Paper style={{ position: 'fixed' }}>
        <MenuList>
          <MenuItem component={RouterLink} to="/user">Personal Information</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>My Groups</MenuItem>
          <MenuItem>Friends</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
    </Grid>
  );
}
