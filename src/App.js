import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.css';

import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from './containers/UserProfile';

import Header from "./components/Header";
import userEvent from "@testing-library/user-event";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "dw-exercise-5.firebaseapp.com",
  databaseURL: "https://dw-exercise-5.firebaseio.com",
  projectId: "dw-exercise-5",
  storageBucket: "dw-exercise-5.appspot.com",
  messagingSenderId: "692532066106",
  appId: "1:692532066106:web:8a0a2c6ee2a523ae758203",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});


  useEffect(() => {

    if (!firebase.apps.length) {

      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig])

useEffect(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log({user})
    if(user) {
      // user is logged in
      setLoggedIn(true);
      setUserInformation(user);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  })
}, [])

  function LoginFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log('LOGIN RESPONSE', response);
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log('LOGIN ERROR', error);
      });
  }

  function LogoutFunction() {
    firebase
    .auth()
    .signOut()
    .then(function() {
      setLoggedIn(false);
      // setUserInformation(user)
    })
    .catch(function (error) {
      console.log("LOGOUT ERROR", error);
    })
  }

  function CreateAccountFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log('VALID ACCOUNT CREATED FOR:', email, response);
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log('ACCOUNT CREATION FAILED', error);
      })
  }
  console.log({userInformation});

  if(loading) return null;

  return (
  <div className="App">
    <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction}/>
    <Router> 
      <Route exact path="/login">
        {/* If someone is logged in, do not take them to login page - take them to user profile */}
        {!loggedIn ? (
                <Login LoginFunction={LoginFunction}/>
        ) : (
            <Redirect to="/" />
        )}
      </Route>
      <Route exact path="/create-account">
        {/* if someone is logged in, do not take htem to create account page - take them to user profile */}
        {!loggedIn ? (
        <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
        ) : (
          <Redirect to="/" />
      )}
      </Route>
      <Route exact path="/">
      {!loggedIn ? (
      <Redirect to="/login" /> 
      ) : ( <UserProfile userInformation={userInformation} /> )} 
        </Route>
    </Router>
    </div>
  );
}

export default App;
