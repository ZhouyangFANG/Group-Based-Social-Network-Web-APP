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

const lib = require('../../fetch');

export default function GroupPage() {

  const { groupName } = useParams();
  const [certainGroup, setCertainGroup] = useState(null);
  const [groupAnal, setGroupAnal] = useState({num_member:-1, num_post:-1, num_deleted:-1, num_flagged:-1, num_hidden:-1});
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
    const analy = await lib.getGroupAnaly(groupName);
    if (isMounted) {
      setCertainGroup(groupInfo);
      setGroupAnal(analy);
      console.log('got group info');
    }
    return (() => { isMounted = false; });
  }, []);

  return (
    <>
      <Header title={groupName} />
      <Grid container spacing={2}>
        <LeftPanel />
        <Grid item xs={8} md={5}>
          <Posts certainGroup={certainGroup} />
        </Grid>
        <ControlPanel groupName={groupName} />
        <Grid item xs={2} md={2}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Group Analytics
              </Typography>
              <Typography variant="body2">
                Member Number: {groupAnal.num_member}
              </Typography>
              <Typography variant="body2">
                Post Number: {groupAnal.num_post}
              </Typography>
              <Typography variant="body2">
                Deleted Number: {groupAnal.num_deleted}
              </Typography>
              <Typography variant="body2">
                Flagged Number: {groupAnal.num_flagged}
              </Typography>
              <Typography variant="body2">
                Hidden Number: {groupAnal.num_hidden}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
