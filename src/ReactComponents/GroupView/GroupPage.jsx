import { Link as RouterLink, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { React, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import {
  getGroupList,
  addAdmin,
  removeAdmin,
  requestToJoinGroup, inviteUser, leaveGroup, filterGroupsByTags, getGroupPage
} from '../../api';
import Header from '../Header';
import Posts from './Posts';
import ControlPanel from './ControlPanel';
import LeftPanel from '../LeftPanel';

export default function GroupPage() {

  const { groupName } = useParams();
  const [certainGroup, setCertainGroup] = useState(null);
  // const [certainGroup, setCertainGroup] = useState({
  //   id: '',
  //   name: '',
  //   admins: [''],
  //   members: [''],
  //   tags: '',
  //   visibility: true,
  //   posts: [{
  //     id: '',
  //     title: '',
  //     author: '',
  //     content: ''
  //   }],
  // });

  useEffect(async () => {
    let isMounted = true;
    const groupInfo = await getGroupPage(groupName);
    if (isMounted) {
      setCertainGroup(groupInfo);
      console.log('got group info');
    }
    return (() => { isMounted = false; });
  }, []);


  function addPost() {
    let url = window.location.href;
    url += "/post";
    window.location.href = url;
  }

  return (
    <>
      <Header title={groupName} />
      <Grid container spacing={2}>
        <LeftPanel />
        <Grid item xs={8} md={5}>
          <Posts certainGroup={certainGroup} />
        </Grid>
        <ControlPanel groupName={groupName} />
      </Grid>
    </>
  );
}
