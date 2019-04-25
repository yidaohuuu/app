import React from 'react'
import Area from '../Area'

const AddTopic = ({ topicName, onChangeTopicName, topicDescription, setTopicDescription, addTopic }) => {
    return (
        <Area key='2'>
            Create a topic: <br />
            Name: <input value={topicName} onChange={onChangeTopicName} /> <br />
            Description: <input value={topicDescription} onChange={e => setTopicDescription(e.target.value)} /> <br />
            <button onClick={addTopic}>Create</button>
        </Area>
    )
}

export default AddTopic