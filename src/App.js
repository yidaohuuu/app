import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () => {
  const [text, setText] = useState('iii')
  const onClick = () => {
    const number = Math.random()
    setText('changed yo' + number)
  }
  const fireIt = () => {
    fetch('/test/save')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log('the data', data)
      })
  }
  return (
    <div>
      <div onClick={onClick} >lalllla {text} </div>
      <div onClick={fireIt}>ooook</div>
    </div>
  )
}

const App = () => (
  <div>
    <Test/>
  </div>
)


export default App;
