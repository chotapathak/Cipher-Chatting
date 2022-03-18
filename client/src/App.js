import React from 'react';
import Chat from './chat/chat';
import Process from './process/process';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './home/home';
import io from 'socket.io-client';
import './App.css';

const socket = io('https://localhost:3000');

function Appmain(props) {
  return (
    <React.Fragment>
      <div className='right'>
        <Chat 
            username={props.match.params.username}
            roomname={props.match.params.roomname}
            socket={socket}
            />
      </div>
      <div className='left'>
        <Process />
      </div>
    </React.Fragment>
  )
}

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' exact>
          <Home socket={socket} />
        </Route>
        <Route path='/chat/:roomname/:username' 
          component={Appmain} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
