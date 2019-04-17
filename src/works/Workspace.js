import React, { Component, useState, Fragment} from 'react';
import TopicItem from './TopicItem'


function getResource () {
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
    const saveGraph = (graph) => {
        return post('/graph', {graph})
    }

    const getGraph = () => {
        return fetch('/graph')
            .then(res => res.json())
    }


    const getBack = () => {
      fetch('/test/read')
        .then(res => res.text())
        .then(data => {
        })
    }
    return {
        saveGraph,
        getGraph
    }
}


const resource = getResource()

const Area = (props) => (
    <div style={{border: '1px solid black', margin: '20px', padding: '10px'}}> 
        {props.children}
    </div>
)

const DoButton = ({text, onClick}) => {
    return (
        <Area>
            <button onClick={onClick}>{text}</button>
        </Area>
    )
}

const Save = ({onClick}) => {
    return <DoButton onClick={onClick} text="Save" />
}

const Load = ({onClick}) => <DoButton onClick={onClick} text="Reload" />

const isRequired = () => {
    throw new Error('A required parameter is missing')
}

const topicFuncs = {
    createTopic ({name = isRequired(), description = '', }) {
        return {
            name,
            description,
            labels: [],
            similar: [],
            comments: [],
        }
    }
}

const labelFuncs = {
    createLabel ({name = isRequired()}) {
        return {
            name,
            similar: []
        }
    }
}

const Workspace = () => {
    const [topics, setTopics] = useState([])
    const [labels, setLabels] = useState([])
    const [topicName, setTopicName] = useState('')
    const [labelName, setLabelName] = useState('')
    const [topicDescription, setTopicDescription] = useState('')
    const addTopic = () => {
        const topic = topicFuncs.createTopic({name: topicName})
        setTopics([...topics, topic])
        setTopicName('')
    }
    const addLabel = () => {
        const label = labelFuncs.createLabel({name: labelName})
        setLabels([...labels, label])
        setLabelName('')
    }

    const onSave = () => {
        const graph = {
            topics,
            labels
        }
        resource.saveGraph(graph)
    }

    const onLoad = () => {
        resource.getGraph()
            .then((graph) => {
                setTopics(graph.topics)
                setLabels(graph.labels)
            })
    }

    return (
        <Fragment> 
            <Area> 
                Current topics: 
                {topics.map(topic => <TopicItem key={topic.name} topic={topic} onClick={e => alert(topic.name)} />)}
                <br/>
                Current labels: 
                {labels.map(label => label.name).join(', ')}
            </Area>
            <Area> 
                Create a topic: <br/>
                Name: <input value={topicName} onChange={e => setTopicName(e.target.value)} /> <br/>
                Description: <input value={topicDescription} onChange={e => setTopicDescription(e.target.value)} /> <br/>
                <button onClick={addTopic}>Create</button>

            </Area>
            <Area> 
                Create a label: <br/>
                Name: <input value={labelName} onChange={e => setLabelName(e.target.value)} /> <br/>
                <button onClick={addLabel}>Create</button>
            </Area>
            <Save onClick={onSave}/>
            <Load onClick={onLoad} />

        </Fragment>
    )
}

export default  Workspace