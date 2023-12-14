import React from 'react';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CrearEvento from './pages/CrearEvento';
import { Link } from "react-router-dom";
import auth from './services/auth';


function App() {
  const [user, setUser] = useState({});

  async function handleCallbackResponse(res){
    console.log("Encoded JWT ID token: " + res.credential);
    var user = jwtDecode(res.credential);
    console.log(user);
    localStorage.setItem('token', res.credential);
    document.getElementById("signInDiv").hidden = true;
    setUser(user);
  }

  async function handleSignOut(e){
    e.preventDefault();
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "989704436454-csk7qq6vcu178n8g8potcdhhdc75l06p.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

    
  }, []);

  return (
    <div>
      <div className='App'>
        <div id="signInDiv"></div>
        {
          Object.keys(user).length != 0 && 
          <button onClick={(e) => handleSignOut(e)}>Sign out</button>
        }
        { user &&
          <div>
            <h1>AAAAA</h1>
          </div>
        }
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/crear-evento" element={<CrearEvento></CrearEvento>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;
