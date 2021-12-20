import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupPage, JoinRequestDecision } from '../../api';
import Header from '../Header';
import ControlPanel from './ControlPanel';
import Posts from './Posts';

const lib = require('../../fetch');

export default function GroupPage() {
  const { groupName } = useParams();
  const [certainGroup, setCertainGroup] = useState(null);
  const [groupAnal, setGroupAnal] = useState({
    num_member: -1, num_post: -1, num_deleted: -1, num_flagged: -1, num_hidden: -1,
  });
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

  function addPost() {
    let url = window.location.href;
    url += '/post';
    window.location.href = url;
  }

  const List1 = () => {
    const { admins } = certainGroup;
    return (
      admins.map((person) => (
        <li key={person.id}>
          <Link href={`/chat/${person.username}`} variant="body2">
            {person.username}
          </Link>
        </li>
      ))
    );
  };
  const List2 = () => {
    const { members } = certainGroup;
    return (
      members.map((person) => (
        <li key={person.id}>
          <Link href={`/chat/${person.username}`} variant="body2">
            {person.username}
          </Link>
        </li>
      ))
    );
  };
  const List3 = () => {
    const { requests } = certainGroup;
    return (
      requests.map((person) => (
        <li key={person.id}>
          {person.username}
          <Button variant="contained" type="submit" onClick={JoinRequestDecision(groupName, person.username, false)}>Deny</Button>
          <Button variant="contained" type="submit" onClick={JoinRequestDecision(groupName, person.username, true)}>Accept</Button>
        </li>
      ))
    );
  };

  return (
    <>
      <Header title={`Group Name: ${groupName}`} userName={window.localStorage.getItem('username')} />
      <Grid container spacing={2}>
        <Grid item xs={3} md={3}>
          <Paper>
            {
              certainGroup
              && (
                <>
                  Admins:
                  <ul>
                    <List1 />
                  </ul>
                  Members:
                  <ul>
                    <List2 />
                  </ul>
                  {
                    certainGroup.requests
                    && (
                      <>
                        Request to Join:
                        <ul>
                          <List3 />
                        </ul>
                      </>
                    )
                  }
                </>
              )
            }
          </Paper>
        </Grid>
        <Grid item xs={4} md={4}>
          <Posts certainGroup={certainGroup} />
        </Grid>
        <Grid item xs={2} md={2}>
          <ControlPanel groupName={groupName} />
        </Grid>
        <Grid item xs={2} md={2}>
          <Card sx={{ minWidth: 200 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Group Analytics
              </Typography>
              <Typography variant="body2">
                Member Number:
                {' '}
                {groupAnal.num_member}
              </Typography>
              <Typography variant="body2">
                Post Number:
                {' '}
                {groupAnal.num_post}
              </Typography>
              <Typography variant="body2">
                Deleted Number:
                {' '}
                {groupAnal.num_deleted}
              </Typography>
              <Typography variant="body2">
                Flagged Number:
                {' '}
                {groupAnal.num_flagged}
              </Typography>
              <Typography variant="body2">
                Hidden Number:
                {' '}
                {groupAnal.num_hidden}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
