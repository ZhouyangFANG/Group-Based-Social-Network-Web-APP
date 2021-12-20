import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { React, useState } from 'react';

const lib = require('../../fetch');

const theme = createTheme();

export default function AddPost() {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('null');
  const reader = new FileReader();
  async function addPost() {
    const content = document.getElementById('content');
    const title = document.getElementById('title');

    const url = window.location.href;
    const urlList = url.split('/');
    urlList.pop();
    const groupID = urlList.pop();
    const res = await lib.addPost(groupID, title.value, content.value, media, mediaType);
    if (res === 200) {
      let newUrl = '';
      for (let i = 0; i < urlList.length; i += 1) {
        newUrl = `${newUrl}${urlList[i]}/`;
      }
      newUrl = `${newUrl}${groupID}`;
      window.location.href = newUrl;
    } else {
      /* eslint-disable no-alert */
      alert('Error!');
      window.location.href = window.location.href; // eslint-disable-line no-self-assign
    }
  }
  const handleImage = (event) => {
    console.log(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      console.log(reader.result);
      setMedia(reader.result);
      setMediaType('image');
    }, false);

    // setObjectURL(URL.createObjectURL(event.target.files[0]));
    // console.log(objectURL);
    // let video = document.getElementsByTagName('video')[0];
    // video.src = URL.createObjectURL(event.target.files[0]);
    // video.load();
    // video.onloadeddata = function () {
    //     video.play();
    // }

    // const sound = () => <audio src={event.target.files[0]} autoPlay />;
    // const audioElement = new Audio(event.target.files[0]);
    // audioElement.play();
  };
  const handleAudio = (event) => {
    console.log(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      console.log(reader.result);
      setMedia(reader.result);
      setMediaType('audio');
    }, false);
  };
  const handleVideo = (event) => {
    console.log(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      console.log(reader.result);
      setMedia(reader.result);
      setMediaType('video');
    }, false);
  };

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
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              type="content"
              id="content"
            />
            <Button
              data-testid="submit"
              fullWidth
              id="addBtn"
              variant="contained"
              onClick={addPost} // eslint-disable-line react/jsx-no-bind
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              component="label"
            >
              Image
              <input
                type="file"
                onChange={handleImage}
                hidden
              />
            </Button>
            <Button
              variant="contained"
              component="label"
            >
              Audio
              <input
                type="file"
                onChange={handleAudio}
                hidden
              />
            </Button>
            <Button
              variant="contained"
              component="label"
            >
              Video
              <input
                type="file"
                onChange={handleVideo}
                hidden
              />
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
