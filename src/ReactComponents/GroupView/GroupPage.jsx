import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Post from './Post';

const theme = createTheme();

export default function GroupPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
