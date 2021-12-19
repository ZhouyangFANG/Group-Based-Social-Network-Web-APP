import { Link as RouterLink, useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
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
import Link from '@mui/material/Link';
import Header from '../Header';
import {
    getMessages, SendMessage
} from '../../api';

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
    const { friendName } = useParams();
    const classes = useStyles();
    const [objectURL, setObjectURL] = useState("");
    const [chatHistory, setChathistory] = useState(null);

    const handleUpload = (event) => {
        console.log(event.target.files[0]);
        setObjectURL(URL.createObjectURL(event.target.files[0]));
        console.log(objectURL);
        let video = document.getElementsByTagName('video')[0];
        video.src = URL.createObjectURL(event.target.files[0]);
        video.load();
        video.onloadeddata = function () {
            video.play();
        }

        // const sound = () => <audio src={event.target.files[0]} autoPlay />;
        // const audioElement = new Audio(event.target.files[0]);
        // audioElement.play();
    }

    useEffect(async () => {
        let isMounted = true;
        const his = await getMessages(friendName);
        if (isMounted) {
            console.log(his);
            setChathistory(his);
            console.log('got chat history');
        }
        return (() => { isMounted = false; });
    }, []);

    const ChatList = () => {
        return (
            chatHistory.map((message) => {
                switch (message.type) {
                    case "text":
                        console.log("receive text message");
                        (
                            <ListItem key={message.id}>
                                <ListItemText primary={"it's a message"}></ListItemText>
                            </ListItem>
                        )
                        // `${message.sender}: ${message.content}`
                        break;
                    case "image":
                        (
                            <ListItem key={message.id}>
                                <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            </ListItem>
                        )
                        break;
                    case "audio":
                        (
                            <ListItem key={message.id}>
                                <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            </ListItem>
                        )
                        break;

                    case "video":
                        (
                            <ListItem key={message.id}>
                                <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                            </ListItem>
                        )
                        break;

                }
            })
        )
    };

    return (
        <>
            <Header title={`Chat with ${friendName}`} userName={`User: ${window.localStorage.getItem("username")}`} />
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {
                            chatHistory &&
                            <ChatList />
                        }
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
                            Image
                            <input
                                type="file"
                                onChange={handleUpload}
                                hidden
                            />
                        </Button>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Audio
                            <input
                                type="file"
                                onChange={handleUpload}
                                hidden
                            />
                        </Button>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Video
                            <input
                                type="file"
                                onChange={handleUpload}
                                hidden
                            />
                        </Button>
                        <Link href={objectURL} variant="body2">
                            Play media
                        </Link>
                        <video>
                        </video>
                    </Grid>
                </Grid>
            </Grid>
        </>

    );
}

export default Chat;