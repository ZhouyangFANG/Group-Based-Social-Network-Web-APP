import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';

function MainView() {
  const columns = [
    {
      field: 'groupName',
      headerName: 'Group Name',
      width: 200,
      renderCell: (params) => (
        <Link component={RouterLink} to="/cis557" variant="body2">{params.value}</Link>
      ),
    },
    { field: 'topics', headerName: 'Topics', width: 400 },
    {
      field: 'join',
      headerName: 'Request to join',
      width: 150,
      renderCell: () => (
        <Button variant="contained" color="primary">Join</Button>
      ),
    },
  ];

  const rows = [
    { id: 1, groupName: 'Group 1', topics: 'Topic 1, Topic 2' },
    { id: 2, groupName: 'Group 2', topics: 'Topic 1, Topic 2' },
    { id: 3, groupName: 'Group 3', topics: 'Topic 1, Topic 2' },
    { id: 4, groupName: 'Group 4', topics: 'Topic 1, Topic 2' },
    { id: 5, groupName: 'Group 5', topics: 'Topic 1, Topic 2' },
    { id: 6, groupName: 'Group 6', topics: 'Topic 1, Topic 2' },
    { id: 7, groupName: 'Group 7', topics: 'Topic 1, Topic 2' },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Public Groups
            </Typography>
            <Button color="inherit">Back</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2} md={3}>
          <Paper>
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
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </Grid>
        <Grid item xs={2} md={1}>
          <Card sx={{ minWidth: 275 }}>
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
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainView;
