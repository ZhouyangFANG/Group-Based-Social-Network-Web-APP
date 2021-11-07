import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Header from './Header';
import Post from './Post';

const theme = createTheme();

export default function GroupPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={2} md={3}>
            <Paper style={{ position: 'fixed' }}>
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
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </Grid>
          <Grid item xs={2} md={1}>
            <Card sx={{ minWidth: 275 }} style={{ position: 'fixed' }}>
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
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create New Post
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Leave This Group
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
