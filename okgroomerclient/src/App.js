import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header';
import { useState,useEffect } from 'react';
import ApplicationViews from './components/ApplicationViews';
import { onLoginStatusChange,me,logout } from './Modules/authManager';
import { Spinner } from "reactstrap";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isGroomer, setIsGroomer] = useState(false)

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);



  useEffect(() => {
    if (isLoggedIn) {
      me().then((userPro) => {
        if (userPro.activeStatus === "Disabled") {
          logout();
        } if(userPro.groomer == true){
          setIsGroomer(true)
        } else {
          setUserProfile(userPro);
        }
      });
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.activeStatus === "Deactivated") {
        setIsLoggedIn(false);
      }
    }
  }, [userProfile]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <ApplicationViews isLoggedIn={isLoggedIn} isGroomer={isGroomer} />
    </Router>
  );
}

export default App;
