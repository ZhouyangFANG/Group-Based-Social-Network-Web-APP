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

export default function LeftPanel() {
  return (<Grid item xs={2} md={3}>
    <Paper style={{ position: 'fixed' }}>
      <MenuList>
        <MenuItem component={RouterLink} to="/user">Personal Information</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>My Groups</MenuItem>
        <MenuItem>Friends</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Paper>
  </Grid>);
}