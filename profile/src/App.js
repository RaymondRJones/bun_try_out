import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem, Paper, TextField, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import './App.css';
import logo from './assets/flight_app_logo.png'

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function Profile({ profiles, setSelectedProfile }) {
  return (
    <List>
      {profiles.map((profile) => (
        <ListItem 
          key={profile.id}
          button
          onClick={() => setSelectedProfile(profile)}
        >
          <Avatar src={profile.image} />
          <Typography variant="body1">{profile.name}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

function ChatBox({ sender_profile, selectedProfile, messages, setMessages }) {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    const new_message = { sender: sender_profile.id, recipient: selectedProfile.id, text: newMessage, type: "sent" };
    setMessages([...messages, new_message]);
    setNewMessage('');
  };
  const is_sent_message = (message) => {
    return message.sender === sender_profile.id
  };
  if (selectedProfile) {
    return (
      <div>
        <Typography variant="h5">{selectedProfile.name}</Typography>
        <div>
          {messages.map((message, index) => (
            <Paper key={index} className="fade-in" style={{
              backgroundColor: is_sent_message(message) ? "#BBDEFB" : "#F5F5F5",
              color: is_sent_message(message) ? "#212121" : "#424242", // Darker text for contras
              margin: "10px",
              padding: "10px"
            }}>
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
          ))}
        </div>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
      </div>
    );
  }
  else {
    return <p>Waiting for response..</p>
  }
}

function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [usersProfile, setUsersProfile] = useState({name: "ray", id: 0, image: "https://via.placeholder.com/50"});
  const clearMessages = () => {
    setMessages([]); // this will set messages to an empty array
  };
  const filteredMessages = messages.filter(
    msg => selectedProfile && (
      (msg.sender === usersProfile.id && msg.recipient === selectedProfile.id) || 
      (msg.sender === selectedProfile.id && msg.recipient === usersProfile.id)
    )
  );


  useEffect(() => {
    const fetchData = async () => {
      const profilesCollection = collection(db, "profiles");
      const profileSnapshot = await getDocs(profilesCollection);
      const profileList = profileSnapshot.docs.map(doc => doc.data());
      setProfiles(profileList);  // populate the state with data fetched
      setSelectedProfile(profileList[0])
      const messagesCollection = collection(db, "messages");
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map(doc => doc.data());
      setMessages(messagesList); // populate the state with data fetched
    };

    fetchData();
  }, []);

  return (
    <div>
      <img src={logo} alt="App logo" style={{width: '140px'}} />
      <Typography variant="h4">Flight: Chat Application</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}> {/* Profile section */}
          <Profile profiles={profiles} setSelectedProfile={setSelectedProfile} />
        </Grid>
        <Grid item xs={9}> {/* ChatBox section */}
          <ChatBox sender_profile={usersProfile} selectedProfile={selectedProfile} messages={filteredMessages} setMessages={setMessages} />
        </Grid>
      </Grid>
      <Button variant="contained" color="secondary" onClick={clearMessages}>Clear Messages</Button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <HomeScreen />
    </div>
  );
}

export default App;
