import { React, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import {
  getGroupList, requestToJoinGroup, filterGroupsByTags, respondInvitation, getNotification,
} from '../api';
import Header from './Header';

const lib = require('../fetch');

function MainView() {
  const [groupList, setGroupList] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [notification, setNotification] = useState(null);
  const whoami = window.localStorage.getItem('username');

  const handleJoinGroup = async (groupName) => {
    console.log(groupName);
    requestToJoinGroup(groupName);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Group Name',
      width: 150,
      renderCell: (params) => (
        <Link component={RouterLink} to={`/groups/${params.value}`} variant="body2">{params.value}</Link>
      ),
    },
    {
      field: 'type',
      headerName: 'Group Type',
      width: 150,
      renderCell: (params) => (
        params.row.type === 1
          ? 'Public'
          : 'Private'),
    },
    {
      field: 'join',
      headerName: 'Request to join',
      width: 150,
      renderCell: (params) => (
        params.row.type === 1 && params.row.is_member === 0
          ? <Button variant="contained" color="primary" onClick={() => { handleJoinGroup(params.row.name); }}>Join</Button>
          : null
      ),
    },
  ];
  const columnsRec = [
    {
      field: 'name',
      headerName: 'Recommend Groups',
      width: 250,
    },
  ];

  useEffect(async () => {
    let isMounted = true;
    const recommendL = await lib.getRecommend();
    const notif = await getNotification();
    if (isMounted) {
      setRecommend(recommendL);
      setNotification(notif);
    }
    return (() => { isMounted = false; });
  }, []);

  const handleGetGroupList = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const tags = data.get('tags');
      console.log(tags);
      if (!tags) {
        const res = await getGroupList();
        setGroupList(res);
        console.log('get whole list');
      } else {
        filterGroupsByTags(tags, setGroupList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function objectSortPostNum() {
    /* eslint-disable func-names */
    return function (objectN, objectM) {
      const valueN = objectN.num_posts;
      const valueM = objectM.num_posts;
      if (valueN < valueM) return 1;
      if (valueN > valueM) return -1;
      return 0;
    };
  }

  const sortByPostsNum = () => {
    const arr = [...groupList];
    arr.sort(objectSortPostNum());
    setGroupList(arr);
  };

  function objectSortMemNum() {
    return function (objectN, objectM) {
      const valueN = objectN.num_members;
      const valueM = objectM.num_members;
      if (valueN < valueM) return 1;
      if (valueN > valueM) return -1;
      return 0;
    };
  }

  const sortByMemberNum = () => {
    const arr = [...groupList];
    arr.sort(objectSortMemNum());
    setGroupList(arr);
  };

  function objectSortNewMsg() {
    return function (objectN, objectM) {
      const valueN = objectN.latest;
      const valueM = objectM.latest;
      if (valueN === null && valueM === null) {
        return 0;
      } if (valueN === null) {
        return 1;
      } if (valueM === null) {
        return -1;
      }
      if (valueN < valueM) return 1;
      if (valueN > valueM) return -1;
      return 0;
    };
  }

  const sortByNewestMsg = () => {
    const arr = [...groupList];
    arr.sort(objectSortNewMsg());
    setGroupList(arr);
  };

  const List1 = () => {
    console.log(notification);
    const { mentions } = notification;
    return (
      mentions.map((person) => (
        <li key={person.id}>
          {`You are memtioned by ${person.username}`}
        </li>
      ))
    );
  };
  const List2 = () => {
    const { messages } = notification;
    return (
      messages.map((person) => (
        <li key={person.id}>
          <Link href={`/chat/${person.username}`} variant="body2">
            {`User ${person.username} has sent you a message, click to view`}
          </Link>
        </li>
      ))
    );
  };
  const List3 = () => {
    const { invitations } = notification;
    return (
      invitations.map((group) => (
        <li key={group.id}>
          {`You are invited to join ${group.name} group`}
          <Button variant="contained" type="submit" onClick={() => { respondInvitation(group.name, false); }}>Deny</Button>
          <Button variant="contained" type="submit" onClick={() => { respondInvitation(group.name, true); }}>Accept</Button>
        </li>
      ))
    );
  };

  const List4 = () => (
    groupList.map((group) => (
      group.is_member === 1
        ? (
          <li key={group.id}>
            {`You are accepted by ${group.name} group`}
          </li>
        )
        : null
    ))
  );

  return (
    <div id="wrapper">
      <Header title="Public Group List" userName={whoami} />

      <Grid container spacing={1}>
        <Grid item xs={2} md={2}>
          {
            notification
            && (
              <>
                You are mentioned by:
                <ul>
                  <List1 />
                </ul>
                The user below sent you messages:
                <ul>
                  <List2 />
                </ul>
                You got invitation to these groups:
                <ul>
                  <List3 />
                </ul>
                You are accepted to join these groups:
                <ul>
                  <List4 />
                </ul>
              </>
            )
          }
        </Grid>
        <Grid item xs={8} md={6}>
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              rows={groupList}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5, 8]}
              disableSelectionOnClick
            />
          </div>
        </Grid>
        <Grid item xs={2} md={1}>
          <Box component="form" id="groupList" onSubmit={handleGetGroupList} noValidate sx={{ mt: 1 }}>
            <TextField name="tags" placeholder="tags" />
            <Button variant="contained" type="submit">Get Group List</Button>
          </Box>
          <Button id="btn1" variant="contained" type="submit" onClick={sortByPostsNum}>Sort groups by number of posts</Button>
          <Button id="btn2" variant="contained" type="submit" onClick={sortByMemberNum}>Sort groups by number of members</Button>
          <Button id="btn3" variant="contained" type="submit" onClick={sortByNewestMsg}>Sort groups by newest messages</Button>
        </Grid>
        <Grid item xs={3} md={3}>
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              rows={recommend}
              columns={columnsRec}
              rowsPerPageOptions={[5, 100]}
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainView;
