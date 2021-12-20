import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const lib = require('../../fetch');

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        YYDS
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const theme = createTheme();

export default function CreateGroup() {
  const [personName, setPersonName] = React.useState([]);
  const [names, setNames] = React.useState([]);

  async function getTag() {
    const res = await lib.getAllTag();
    setNames(res);
  }

  React.useEffect(async () => {
    getTag();
  }, []);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function createGroup() {
    const groupName = document.getElementById('groupName');
    const ans = document.getElementsByName('typeLabel');
    let type;
    for (let j = 0; j < ans.length; j += 1) {
      if (ans[j].checked) {
        type = ans[j].value;
      }
    }

    const res = await lib.createGroup(groupName.value, personName, type);
    if (res === 200) {
      const url = window.location.href;
      const urlList = url.split('/');
      urlList.pop();
      let newUrl = '';
      for (let i = 0; i < urlList.length; i += 1) {
        newUrl = `${newUrl}${urlList[i]}/`;
      }
      newUrl = `${newUrl}groups`;
      window.location.href = newUrl;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            YYDS
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Group
          </Typography>
          <>
            <>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="groupName"
                    name="groupName"
                    label="Group name"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Group Type</FormLabel>
                    <RadioGroup
                      aria-label="group-type"
                      defaultValue="public"
                      name="group-type-radio"
                    >
                      <FormControlLabel name="typeLabel" value="public" control={<Radio />} label="Public" />
                      <FormControlLabel name="typeLabel" value="private" control={<Radio />} label="Private" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name.id}
                            value={name.id}
                          >
                            {name.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  id="btn1"
                  variant="contained"
                  onClick={createGroup}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Create Group
                </Button>
              </Box>
            </>
          </>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
