import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import { useSelector, useDispatch } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser, login } from "./features/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import Login from './Login';




function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          dispatch(login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          }))
        }
      })
  }, [])
  
  return (
    
    <Router>
    { !user ? (
      <Login />
    ): (
      <div className="app">
      <Header />
      <div className='app__body'>
      <Sidebar />
      <Routes>
      <Route exact path='/mail' element={<Mail/>}
        
      />
      <Route exact path="/" element={<EmailList/>}/>
      
         
      </Routes>
      </div>
      
      {sendMessageIsOpen && <SendMail />}
    </div>
    )

    }
      
    </Router>
  );
}

export default App;
