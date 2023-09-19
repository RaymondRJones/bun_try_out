import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Paper, Box, IconButton, Fab, Card, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import './App.css';
import logo from './assets/flight_app_logo.png'
import { Fade } from '@mui/material';
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";


const Profile =  React.forwardRef((props, ref) => {
    const { profile, style } = props;
    const [currentPhoto, setCurrentPhoto] = useState(0);
    function incrementPhoto() {
        if(currentPhoto < profile.photos.length - 1){
            setCurrentPhoto(currentPhoto + 1)
        }
    }
    const decrementPhoto = () => {
        if(currentPhoto >= 1){
            setCurrentPhoto(currentPhoto - 1)
        }

    };
      
    return (
        <div ref={ref} style={style}>
            <div className="profile">
            <h2>{profile.name}</h2>
            <div className="profile-images">
                <Fade in={true} timeout={500}>
                    <Card elevation={4}>
                        <CardMedia
                            component="img"
                            alt={`${profile.name}-${currentPhoto}`}
                            height="300"
                            width="50"
                            image={profile.photos[currentPhoto]}
                            />
                    </Card>
                </Fade>
                <IconButton onClick={decrementPhoto} disabled={currentPhoto === 0}>
                <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={incrementPhoto} disabled={currentPhoto === profile.photos.length - 1}>
                <ArrowForwardIcon />
                </IconButton>
            </div>
            <p>{profile.bio}</p>
            </div>
        </div>
      );
});
  
  const profiles = [
    { name: 'Alice', bio: 'I love coding', photos: ['https://thewondrous.com/wp-content/uploads/2015/07/cute-profile-pics-for-girls-for-facebook.jpg',
'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'] },
    { name: 'Bob', bio: 'I love hiking', photos: ['https://images.pexels.com/photos/4890259/pexels-photo-4890259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/904332/pexels-photo-904332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'] },
    // Add more profiles here
  ];
  
  function SwipeScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedProfiles, setLikedProfiles] = useState([]);

    const handleSwipe = (isAccepted) => {
        if (isAccepted) {
            setLikedProfiles([...likedProfiles, profiles[currentIndex]]);
        }
        setCurrentIndex(currentIndex + 1);

    };
  
    const goToMessages = () => {
        window.location.href = '/';
    };
    const goToUserProfile = () => {
        return
    };
    const theme = createTheme({
        palette: {
          primary: {
            main: '#6200EA', // A color for primary buttons and elements
          },
          secondary: {
            main: '#03DAC6', // A color for secondary buttons and elements
          },
          background: {
            default: '#F2F2F2', // A background color
          },
        },
      });
    return (
        
        <ThemeProvider theme={theme}>

        <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={() => goToUserProfile()}>
                    <AccountCircleIcon />
                </IconButton>
                <Box flexGrow={1} display="flex" justifyContent="center">
                Flight
                </Box>
                <IconButton edge="end" color="inherit" onClick={() => goToMessages()}>
                    <ChatIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

        <Grid container style={{ height: '100vh' }}>
            <Grid item xs={12}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                style={{ height: '100%' }}
            >
                <Paper elevation={3} className="chat-container">
                {currentIndex < profiles.length ? (
                    <Fade  in={true} timeout={2000} mountOnEnter unmountOnExit>
                        <Profile profile={profiles[currentIndex]} />
                    </Fade>
                ) : (
                    <p>There's no more profiles. Please come back later.</p>
                )}
                    <Box mt={2} display="flex" justifyContent="space-between">
                    <Fab
                        variant="extended"
                        color="secondary"
                        onClick={() => handleSwipe(false)}
                    >
                        <CancelIcon />
                        No
                    </Fab>
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={() => handleSwipe(true)}
                        style={{ marginLeft: '10px' }}
                    >
                        <FavoriteIcon />
                        Yes
                    </Fab>
                    </Box>
                </Paper>
            </Box>
            </Grid>
        </Grid>
    </div>
</ThemeProvider>

      );
  }
  
  export default SwipeScreen;
