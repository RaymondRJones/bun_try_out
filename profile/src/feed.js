import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'; // For Reels
import ChatIcon from '@mui/icons-material/Chat'; // For Messages
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // For Profile
import { photos, profiles } from './constants';

// Logged In User Profile Component
const LoggedInUserProfile = ({profile}) => {
  return (
    <div>
      <h2>{profile.username}</h2>
    </div>
  );
};

// News Feed Screen Component
const NewsFeedScreen = () => {
    const drawerWidth = 240; // You can adjust this

    return (
      <div style={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          style={{ width: drawerWidth, flexShrink: 0 }}
        >
          <List>
            <ListItem>
              <h2 style={{fontFamily: 'cursive'}}>Instagram</h2>
            </ListItem>
            {['Home', 'Explore', 'Reels', 'Messages', 'Notifications', 'Create', 'Profile'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> :
                   index === 1 ? <ExploreIcon /> :
                   index === 2 ? <VideoLibraryIcon /> :
                   index === 3 ? <ChatIcon /> :
                   index === 4 ? <NotificationsIcon /> :
                   index === 5 ? <CreateIcon /> : <AccountCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
};

// Profile Component
const Profile = ({profile}) => {
  return (
    <Card style={{ width: '33%', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={profile.username}
          src={profile.photo}
          style={{
            width: '60px',
            height: '60px',
          }}
        />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>
          {profile.username}
        </Typography>
        <Button variant="contained" color="secondary" style={{ marginLeft: 'auto' }}>
          Logout
        </Button>
      </div>
    </Card>
  );
};

// Photo Component
const Photo = ({photo, profile}) => {
    const [isLiked, setIsLiked] = useState(false);
    function toggleLiked() {
        setIsLiked(!isLiked)
    }
    return (
        <Box sx={{ maxWidth: '33%', margin: 'auto' }}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={profile.photo} />}
                    title={profile.username}
                />
                <CardMedia
                    component="img"
                    image={photo.photoUrl}
                    alt="Photo"
                    height="300"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {photo.caption}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton aria-label="add to favorites" onClick={toggleLiked}>
                        {isLiked ? (
                            <FavoriteIcon />) : (
                            <FavoriteBorderIcon />
                            ) }
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
};

// Stories Component
const Stories = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {profiles.slice(0, 6).map((profile, index) => (
            <div 
              key={index} 
              style={{ 
                margin: '0 10px',
                width: '83px', 
                height: '83px', 
                borderRadius: '50%', 
                background: 'linear-gradient(to bottom right, #FFC1A1, #FFAD82)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <Avatar
                alt={profile.username}
                src={profile.photo}
                style={{
                  width: '80px', // Reduced by the size of the border
                  height: '80px',
                  border: '2px solid transparent', 
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>
      );
};

// Main App Component that includes all the above components
const InstagramScreen = () => {
    useEffect(() => {
        // Set the title when the component mounts
        document.title = 'Instagram';
        
        // Optionally, you can also reset the title when the component unmounts
        return () => {
          document.title = 'Original Title';
        };
      }, []);
    // Call API to get a list of this user's friends

    // Call API to get photos / posts of all the friends
    // Call API to get profiles of all friends
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div style={{ width: '200%' }}>
                <LoggedInUserProfile profile={profiles[6]}/>
                <NewsFeedScreen />
                <Stories profiles={profiles} />
                {photos.map((photo, index) => (
                    <Photo
                    key={index}
                    caption={photo.caption}
                    profile={profiles[index]}
                    photo={photo}
                    />
                ))}
            </div>
            <Profile profile={profiles[6]}/>
        </div>
    );
};

export default InstagramScreen;