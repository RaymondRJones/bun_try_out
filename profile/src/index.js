import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SwipeScreen from './Swipe';
import reportWebVitals from './reportWebVitals';
import InstagramScreen from './feed';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (window.location.pathname === '/swipe') {
  root.render(
    <React.StrictMode>
      <SwipeScreen />
    </React.StrictMode>
  );
}
if (window.location.pathname === '/instagram') {
  root.render(
    <React.StrictMode>
      <InstagramScreen />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
