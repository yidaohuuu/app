import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () => {
  const [text, setText] = useState('iii')
  const onClick = () => {
    const number = Math.random()
    setText('changed yo' + number)
  }
  return (
    <div onClick={onClick} >lalllla {text} </div>
  )
}

const App = () => (
  <div>
    <Test/>
  </div>
)


export default App;
