import React, { useState, ChangeEvent } from 'react';
import './App.css';
import Chessboard from './components/Chessboard/Chessboard';

function App() {
  return (
    <div id='app'>
      <div className='chessboard-container'>
        <Chessboard></Chessboard>
      </div>
    </div>
  );
}

export default App;
