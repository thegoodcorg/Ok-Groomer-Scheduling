import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header';
import { useState } from 'react';
import ApplicationViews from './ApplicationViews';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
