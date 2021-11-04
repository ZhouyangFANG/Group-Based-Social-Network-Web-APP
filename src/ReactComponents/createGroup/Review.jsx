import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const admins = [
  {
    name: 'Admin 1',
  },
  {
    name: 'Admin 2',
  },
  {
    name: 'Admin 3',
  },
];

export default function Review() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Group Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Group Name: XXX
          </Typography>
          <Typography gutterBottom>Description</Typography>
          <Typography gutterBottom>Topics</Typography>
          <Typography gutterBottom>Private Group</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Administrators
          </Typography>
          <List disablePadding>
            {admins.map((admin) => (
              <ListItem key={admin.name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={admin.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
