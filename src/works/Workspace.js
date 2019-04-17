import React, { Component, useState, Fragment} from 'react';
import TopicItem from './TopicItem'
import resource from 'resource'
import TopicPage from './TopicPage'





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
    const views = {
        main: 'main',
        topicPage: 'topicPage'
    }
    const [topics, setTopics] = useState([])
    const [labels, setLabels] = useState([])
    const [topicName, setTopicName] = useState('')
    const [labelName, setLabelName] = useState('')
    const [topicDescription, setTopicDescription] = useState('')
    const [view, setView] = useState(views.main)
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

    const mainPage = (
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

    return (
        <Fragment> 
            {view}
            {
                (() => {
                    switch (view) {
                        case 'main': return mainPage
                        case 'topicPage': return <TopicPage />
                        default: return mainPage
                    }
                })()
            }
            <DoButton text="to topic page" onClick={() => setView(views.topicPage)} />
            <DoButton text="to main page" onClick={() => setView(views.main)} />
        </Fragment>
    )
}

export default  Workspace