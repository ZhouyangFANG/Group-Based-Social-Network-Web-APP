import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroupInfo from './GroupInfo';
import Admin from './Admin';
import Review from './Review';

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

const steps = ['Group Information', 'Administrators', 'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <GroupInfo />;
    case 1:
      return <Admin />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function CreateGroup() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [type, setType] = React.useState('');
  const [member, setMember] = React.useState('');

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function createGroup() {
    if (activeStep === 0) {
      const groupName = document.getElementById('groupName');
      setName(groupName.value);
      const groupTopic = document.getElementById('groupTopics');
      setTopic(groupTopic.value);
      const ans = document.getElementsByName('typeLabel');
      for (let j = 0; j < ans.length; j += 1) {
        if (ans[j].checked) {
          setType(ans[j].value);
        }
      }
    } else if (activeStep === 1) {
      setMember('');
    } else if (activeStep === 2) {
      await lib.createGroup(name, topic, type, member);
    }
    setActiveStep(activeStep + 1);
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
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Your group is created.
                </Typography>
                <Typography variant="subtitle1">
                  Your group name is XXX. Please follow
                  {' '}
                  <Link color="inherit" href="/group:1">
                    grouplink
                  </Link>
                  {' '}
                  to review details.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={createGroup}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Create Group' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
