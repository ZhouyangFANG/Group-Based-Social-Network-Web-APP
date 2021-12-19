import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const lib = require('../../fetch');

const theme = createTheme();

export default function AddPost() {

  async function addPost() {
    const content = document.getElementById('content');
    const title = document.getElementById('title');

    const url = window.location.href;
    const urlList = url.split('/');
    urlList.pop();
    const groupID = urlList.pop();
    const res = await lib.addPost(groupID, title.value, content.value);
    if (res === 200) {
      let newUrl = '';
      for (let i = 0; i < urlList.length; i += 1) {
        newUrl = `${newUrl}${urlList[i]}/`;
      }
      newUrl = `${newUrl}${groupID}`;
      window.location.href = newUrl;
    } else {
      alert('Error!');
      window.location.href = window.location.href;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add A Post
          </Typography>
          <Box id="textBox" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus/>
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              type="content"
              id="content"/>
            <Button
              data-testid="submit"
              component={RouterLink}
              fullWidth
              variant="contained"
              onClick={addPost}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/groups" variant="body2">
                  BACK
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
