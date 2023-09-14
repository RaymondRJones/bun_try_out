import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem, Paper, TextField, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import './App.css';
import logo from './assets/flight_app_logo.png'

import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function Profile({profiles, setSelectedProfile }) {
  return (
    <List>
      {profiles.map((profile) => (
        <ListItem 
          key={profile.id}
          button
          onClick={() => setSelectedProfile(profile)}
        >
          <Avatar src={profile.image} style={{ width: '100px', height: '100px' }} />
          <Typography variant="body1">{profile.name}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

function ChatBox({ sender_profile, selectedProfile, messages, setMessages }) {
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = async () => {
    const timestamp = new Date().toISOString();
    const new_message = { sender: sender_profile.id, recipient: selectedProfile.id, text: newMessage, timestamp};
    await addDoc(collection(db, "messages"), new_message);
    setMessages([...messages, new_message]); 
    setNewMessage("");
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => doc.data());
      const sortedMessages = newMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sorting by date
      setMessages(sortedMessages);
    });
  
    return () => unsubscribe();
  }, []);
  const is_sent_message = (message) => {
    return message.sender === sender_profile.id
  };
  if (selectedProfile && sender_profile) {
    return (
      <div>
        <Typography variant="h5">Chatting with: {selectedProfile.name}</Typography>
        <div>
          {messages.map((message, index) => (
            <Paper key={index} elevation={2} className="fade-in" style={{
              backgroundColor: is_sent_message(message) ? "#BBDEFB" : "#F5F5F5",
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {  // Checks if Enter key is pressed and Shift is not held down
              e.preventDefault(); // Prevents a new line being added in the TextField
              sendMessage(); // Send the message
            }
          }}
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
  const [usersProfile, setUsersProfile] = useState(null);
  const [passphrase, setPassphrase] = useState("");
  
  const handleLogin = () => {
    // Function to search profiles for the passphrase and set user's profile
    const matchingProfile = profiles.find(profile => profile.passphrase === passphrase);
    if (matchingProfile) {
      setUsersProfile(matchingProfile);
    } else {
      alert("Incorrect passphrase!");
    }
  };
  
  const clearMessages = () => {
    setMessages([]); // this will set messages to an empty array
  };
  const filteredProfiles = profiles.filter(profile => usersProfile && profile.id !== usersProfile.id);
  const filteredMessages = messages.filter(
    msg => usersProfile && selectedProfile && (
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
     <Grid container alignItems="center" justify="space-between">
      <Grid item>
        <img src={logo} alt="App logo" style={{ width: '140px' }} />
        <Typography variant="h4">Flight: Chat Application</Typography>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}> {/* Profile section */}
          <Profile profiles={filteredProfiles} setSelectedProfile={setSelectedProfile} />
        </Grid>
        <Grid item xs={9}> {/* ChatBox section */}
          <ChatBox sender_profile={usersProfile} selectedProfile={selectedProfile} messages={filteredMessages} setMessages={setMessages} />
        </Grid>

      </Grid>
      <TextField
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="Enter password"
          size="small"
        />
      <Button variant="contained" color="primary" onClick={handleLogin} size="small">
        Login
      </Button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Paper elevation={3} className="chat-container">
            <HomeScreen />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
