import { React, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
  const [personName, setPersonName] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setPersonName([]);
  };
  const handleClose = () => setOpen(false);

  const [openJoin, setOpenJoin] = useState(false);
  const handleOpenJoin = () => {
    setOpenJoin(true);
  };
  const handleCloseJoin = () => setOpenJoin(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        <Button variant="contained" color="primary" onClick={() => handleOpenJoin()}>Join</Button>
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

  const { type } = useParams();
  let groupType;
  if (type === 'my') {
    groupType = 'My Groups';
    columns[2].headerName = 'Invite Others';
    columns[2].renderCell = () => (
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Invite</Button>
    );
  } else {
    groupType = 'Public Groups';
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
              {groupType}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invite Friend to Group CIS557
          </Typography>
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
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => handleClose()}>Submit</Button>
        </Box>
      </Modal>
      <Modal
        open={openJoin}
        onClose={handleCloseJoin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to join Group CIS557?
          </Typography>
          <Button color="secondary" onClick={() => handleCloseJoin()}>No</Button>
          <Button variant="contained" color="success" onClick={() => handleCloseJoin()}>Yes</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MainView;
