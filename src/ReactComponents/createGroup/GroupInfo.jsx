import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function GroupInfo() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Group Information
      </Typography>
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
          <TextField
            id="groupTopics"
            label="Group Topics"
            multiline
            maxRows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="groupDescription"
            label="Group Description"
            multiline
            maxRows={4}
            fullWidth
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
      </Grid>
    </>
  );
}
