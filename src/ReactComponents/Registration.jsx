import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lib = require('../fetch');

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const confirmRegister = async () => {
    const pwd = document.getElementById('password');
    const user = document.getElementById('userName');
    const reg = /^[0-9a-zA-Z]+$/;
    if (!(pwd.value.match(reg)) || pwd.value.length < 6) {
      /* eslint-disable no-alert */
      alert('Please enter alphanumeric password which has more than 5 characters values only!');
      pwd.value = '';
      return;
    }
    const res = await lib.register(user.value, pwd.value);
    if (res === 201) {
      const url = window.location.href;
      const urlList = url.split('/');
      urlList.pop();
      let newUrl = '';
      for (let i = 0; i < urlList.length; i += 1) {
        newUrl = `${newUrl}${urlList[i]}/`;
      }
      newUrl = `${newUrl}login`;
      alert('Success!');
      window.location.href = newUrl;
    } else {
      alert('Failure');
      pwd.value = '';
    }
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
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="user-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              id="registerBtn"
              data-testid="submit"
              type="submit"
              fullWidth
              variant="contained"
              onClick={confirmRegister}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
