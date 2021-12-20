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
    const reader = new FileReader();

    const handleImage = (event) => {
        console.log(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            console.log(reader.result);
            SendMessage(friendName, reader.result, "image");
        }, false);

        // setObjectURL(URL.createObjectURL(event.target.files[0]));
        // console.log(objectURL);
        // let video = document.getElementsByTagName('video')[0];
        // video.src = URL.createObjectURL(event.target.files[0]);
        // video.load();
        // video.onloadeddata = function () {
        //     video.play();
        // }

        // const sound = () => <audio src={event.target.files[0]} autoPlay />;
        // const audioElement = new Audio(event.target.files[0]);
        // audioElement.play();
    }
    const handleAudio = (event) => {
        console.log(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0])
        SendMessage(friendName, reader.result, "audio");
    }
    const handleVideo = (event) => {
        console.log(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0])
        SendMessage(friendName, reader.result, "video");
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

    const SendText = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const input = data.get("input");
        console.log(input);
        SendMessage(friendName, input, "text");
    }

    const ChatList = () => {
        return (
            chatHistory.map((message) => {
                switch (message.type) {
                    case "text":
                        console.log("receive text message");
                        return (
                            <ListItem key={message.id}>
                                <ListItemText primary={`${message.sender}: ${message.content}`}></ListItemText>
                            </ListItem>
                        )
                    case "image":
                        console.log("receive image message");
                        return (
                            <ListItem key={message.id}>
                                <ListItemText primary={`${message.sender}: `}></ListItemText>
                                <img src={message.content} />
                            </ListItem>
                        )
                    case "audio":
                        console.log("receive audio message");
                        return (
                            <ListItem key={message.id}>
                                <ListItemText primary={`${message.sender}: `}></ListItemText>
                                <audio src={message.content} />
                            </ListItem>
                        )

                    case "video":
                        console.log("receive video message");
                        return (
                            <ListItem key={message.id}>
                                <ListItemText primary={`${message.sender}: `}></ListItemText>
                                <video src={message.content} />
                            </ListItem>
                        )

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
                            <ListItemText primary={`Chat with ${friendName}`}></ListItemText>
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
                        {/* <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid> */}
                        <Grid item xs={11}>
                            <Box component="form" onSubmit={SendText} noValidate sx={{ mt: 1 }}>
                                <TextField name="input" placeholder="Type Something" fullWidth />
                                <Button variant='contained' type="submit">Send</Button>
                            </Box>
                        </Grid>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Image
                            <input
                                type="file"
                                onChange={handleImage}
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
                                onChange={handleAudio}
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
                                onChange={handleVideo}
                                hidden
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>

    );
}

export default Chat;