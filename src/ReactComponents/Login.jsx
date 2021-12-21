import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const lib = require('../fetch');

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const confirmLogin = async () => {
    const pwd = document.getElementById('password');
    const email = document.getElementById('email');

    const curr = JSON.parse(window.localStorage.getItem(email.value));
    const timeV = new Date().getTime();
    if (curr !== null) {
      const diff = (timeV - curr.time) / 1000;
      if (curr.count >= 3 && diff < 300) {
        /* eslint-disable no-alert */
        alert('Your account has been locked out');
        return;
      }
    }

    const res = await lib.login(email.value, pwd.value);
    if (res === 401){
      pwd.value = '';
      alert('Account Deleted');
    }else if (res === 200) {
      if (curr !== null) {
        window.localStorage.setItem(email.value, JSON.stringify({ count: 0, time: timeV }));
      }

      const url = window.location.href;
      const urlList = url.split('/');
      urlList.pop();
      let newUrl = '';
      for (let i = 0; i < urlList.length; i += 1) {
        newUrl = `${newUrl}${urlList[i]}/`;
      }
      newUrl = `${newUrl}groups`;
      window.location.href = newUrl;
    } else {
      pwd.value = '';
      alert('Error password!');
      if (curr === null) {
        window.localStorage.setItem(email.value, JSON.stringify({ time: timeV, count: 1 }));
      } else {
        const v = curr.count + 1;
        window.localStorage.setItem(email.value, JSON.stringify({ time: timeV, count: v }));
      }
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              data-testid="submit"
              id="loginBtn"
              type="submit"
              fullWidth
              variant="contained"
              onClick={confirmLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/registration" variant="body2">
                  Don&apos;t have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
