import { React, useState } from 'react';
import { Link as RouterLink, useParams, useHistory} from 'react-router-dom';
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
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getGroupList, addAdmin, removeAdmin, requestToJoinGroup, inviteUser, leaveGroup, filterGroupsByTags } from '../api';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MainView() {
  const theme = useTheme();
  const [groupList, setGroupList] = useState([]);
  const userName = 'FakeName';
  const history = useHistory();
  const columns = [
    {
      field: 'name',
      headerName: 'Group Name',
      width: 150,
      renderCell: (params) => (
        <Link component={RouterLink} to="/cis557" variant="body2">{params.value}</Link>
      ),
    },
    { field: 'tags', headerName: 'Tags', width: 200 },
    {
      field: 'join',
      headerName: 'Request to join',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={()=> {handleJoinGroup(params)}}>Join</Button>
      ),
    },
  ];

  const handleJoinGroup = async (group) => {
    console.log(group);
    await requestToJoinGroup(group.id, userName);
    const path = `/${group.row.name}`;
    history.push(path);
  }

  const handleGetGroupList = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const tags = data.get("tags");
    console.log(tags);
    if (!tags) {
      await getGroupList(setGroupList);
      console.log('get whole list');
    } else {
      filterGroupsByTags(tags, setGroupList);
    }
  }

  return (
    <div id="wrapper">
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
              Public Group List
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={2} md={2}>
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
        <Grid item xs={8} md={6}>
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              rows={groupList}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </Grid>
        <Grid item xs={2} md={1}>
          <Box component="form" onSubmit={handleGetGroupList} noValidate sx={{ mt: 1 }}>
            <TextField name="tags" placeholder="tags" />
            <Button variant='contained' type="submit">Get Group List</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainView;
