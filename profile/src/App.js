import React, { useState } from 'react';
import { Avatar, List, ListItem, Paper, TextField, Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import './App.css';
import logo from './assets/flight_app_logo.png'
const profiles = [
  { id: 1, name: "John", image: "https://via.placeholder.com/50" },
  { id: 2, name: "Jane", image: "https://via.placeholder.com/50" }
];

const initialMessages = [
  { sender: 1, recipient: 2, text: "Hello, how are you?", type: "sent" },
  { sender: 2, recipient: 1, text: "I am good, how about you?", type: "received" }
];

function Profile({ profiles, setSelectedProfile }) {
  const setProfile = () => {
    return;
  };
  return (
    <List>
      {profiles.map((profile) => (
        <ListItem key={profile.id}>
          <Avatar src={profile.image} />
          <Typography variant="body1">{profile.name}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

function ChatBox({ selectedProfile, messages, setMessages }) {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    const new_message = { sender: 1, recipient: 2, text: newMessage, type: "sent" };
    setMessages([...messages, new_message]);
    setNewMessage('');
  };

  return (
    <div>
      <Typography variant="h5">{selectedProfile.name}</Typography>
      <div>
        {messages.map((message, index) => (
          <Paper key={index} className="fade-in" style={{
            backgroundColor: message.type === "sent" ? "blue" : "grey",
            color: "white",
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

function HomeScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const clearMessages = () => {
    setMessages([]); // this will set messages to an empty array
  };
  return (
    <div>
      <img src={logo} alt="App logo" style={{width: '140px'}} />
      <Typography variant="h4">Flight: Chat Application</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}> {/* Profile section */}
          <Profile profiles={profiles} setProfile={setSelectedProfile} />
        </Grid>
        <Grid item xs={9}> {/* ChatBox section */}
          <ChatBox selectedProfile={selectedProfile} messages={messages} setMessages={setMessages} />
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
