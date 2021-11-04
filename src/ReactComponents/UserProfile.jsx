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

function UserProfile() {
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
            <Button color="inherit">Back</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2}>
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
        <Grid item xs={8} md={7}>
          <Stack spacing={2}>
            Personal Information
            <TextField
              variant="outlined"
              margin="normal"
              id="email"
              label="Email"
              autoFocus
            >
              Email
            </TextField>
            <TextField variant="outlined" margin="normal" id="username" label="User Name" autoFocus />
            <TextField variant="outlined" margin="normal" id="phone" label="Phone Number" autoFocus />
            <TextField variant="outlined" margin="normal" id="link" label="Links" autoFocus />
            <TextField variant="outlined" margin="normal" id="gender" label="Gender" autoFocus />
            <TextField variant="outlined" margin="normal" id="birth" label="Birthday" autoFocus />
            <Button variant="contained">Save</Button>

          </Stack>
        </Grid>
        <Grid item xs={2} md={1}>
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
