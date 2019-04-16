import React, { Component, useState, Fragment} from 'react';


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

function getTopicFuncs () {
    return {
        createTopic ({name = isRequired, description = '', }) {
            return {
                name,
                description,
                labels: [],
            }
        }
    }
}

const Workspace = () => {
    const [topics, setTopics] = useState([])
    const [labels, setLabels] = useState([])
    const [topicName, setTopicName] = useState('')
    const [labelName, setLabelName] = useState('')
    const addTopic = () => {
        setTopics([...topics, {name: topicName}])
        setTopicName('')
    }
    const addLabel = () => {
        setLabels([...labels, {name: labelName}])
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
                Current topics: {topics.map(topic => topic.name).join(', ')} <br/>
                Current labels: {labels.map(label => label.name).join(', ')}
            </Area>
            <Area> 
                Create a topic: <br/>
                Name: <input value={topicName} onChange={e => setTopicName(e.target.value)} /> <br/>
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