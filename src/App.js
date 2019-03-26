import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function post (url, json) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then(res => res.json())
}

const Test = () => {
  const [text, setText] = useState('iii')
  const onClick = () => {
    const number = Math.random()
    setText('changed yo' + number)
  }
  const fireIt = () => {
    return post('/test/post', {val: 'client'})
      .then(data => {
        console.log('check my data out', data)
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
