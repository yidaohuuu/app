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
  const [text, setText] = useState('')
  const onClick = () => {
    const number = Math.random()
    setText('changed yo' + number)
  }
  const fireIt = () => {
    return post('/test/post', {value: text})
      .then(data => {
        console.log('check my data out', data)
      })
  }
  const [info, setInfo] = useState('')
  const getBack = () => {
    fetch('/test/read')
      .then(res => res.text())
      .then(data => {
        setInfo(data)
      })
  }
  const onChange = e => setText(e.target.value)
  return (
    <div>
      <input value={text} onChange={onChange} />
      <div onClick={fireIt}>send</div>
      <div onClick={getBack}> get back: {JSON.stringify(info)}</div>
    </div>
  )
}

const App = () => (
  <div>
    <Test/>
  </div>
)


export default App;
