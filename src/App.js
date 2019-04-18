import React, {useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Workspace from './works/Workspace'

const Test = () => {
  const [text, setText] = useState('')
  const [info, setInfo] = useState('')

  const onClick = () => {
    const number = Math.random()
    setText('changed yo' + number)
  }
  const onChange = e => setText(e.target.value)
  return [
    <div style={{margin: '30px', border: '1px solid black', width: '300px'}}>
      Testing area <br/>
      <input value={text} onChange={onChange} /> <br/>
      <button >send</button> <br/>
      <button> get </button> <br/>
      <div>content: {JSON.stringify(info)}</div>
    </div>,
    <div style={{border: '1px solid black', margin: '20px'}}> 
      Create a topic
      Name: <input />
    </div>,
    <Workspace/>
  ]
}

const App = () => (
  <div>
    <Workspace />
  </div>
)


export default App;
