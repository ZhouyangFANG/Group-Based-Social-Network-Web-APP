import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@material-ui/icons/Send';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
    }
});

const Chat = () => {
    const classes = useStyles();

    const handleUpload = (event) => {
        console.log(event.target.files[0]);
        const objectURL = URL.createObjectURL(event.target.files[0]);
        console.log(objectURL);

        // const sound = () => <audio src={event.target.files[0]} autoPlay />;
        // const audioElement = new Audio(event.target.files[0]);
        // audioElement.play();
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <ListItem key="3">
                            <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                        </ListItem>
                        <ListItem key="4">
                            <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            <audio controls>
                                <source src={} />
                                <track default kind="captions" />
                            </audio>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Send File
                            <input
                                type="file"
                                onChange={handleUpload}
                                hidden
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;