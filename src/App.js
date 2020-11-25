import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.css';

import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from './containers/UserProfile';

import Header from "./components/Header";

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
  // const [userInformation, setUserInformation] = useState({});


  useEffect(() => {

    if (!firebase.apps.length) {

      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig])

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
  console.log({ loggedIn });

  return (
  <div className="App">
    <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction}/>
    <Router> 
      <Route exact path="/login">
        <Login LoginFunction={LoginFunction}/>
      </Route>
      <Route exact path="/create-account">
        <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
      </Route>
      <Route exact path="/">
        <UserProfile />
      </Route>
    </Router>
    </div>
  );
}

export default App;
