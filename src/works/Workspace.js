import React, {useState, Fragment} from 'react';
import TopicItem from './TopicItem'
import resource from 'resource'
import TopicPage from './TopicPage'
import LabelItem from './LabelItem'
import LabelPage from './LabelPage'

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

const useStore = () => {
    // so far we have no order
    const [topicDict, setTopicDict] = useState({})
    const [labelDict, setLabelDict] = useState({})
    const [currentTopicId, setCurrentTopicId] = useState(null)
    const [currentLabelId, setCurrentLabelId] = useState(null)

    const hasTopic = currentTopicId != null
    const hasLabel = currentLabelId != null
    const currentTopic = hasTopic ? topicDict[currentTopicId] : null
    const currentLabel = hasLabel ? labelDict[currentLabelId] : null


    // derived values
    const topics = Object.values(topicDict)
    const labels = Object.values(labelDict)

    const addTopic = (attrs) => {
        const topic = topicFuncs.createTopic(attrs)
        setTopicDict({...topicDict, [topic.name]: topic})
    }

    const addLabel = (attrs) => {
        const label = labelFuncs.createLabel(attrs)
        setLabelDict({...labelDict, [label.name]: label})
    }

    const save = () => {
        const graph = {
            topicDict,
            labelDict
        }
        return resource.saveGraph(graph)
    }

    const load = () => {
        return resource.getGraph()
            .then((graph) => {
                setTopicDict(graph.topicDict)
                setLabelDict(graph.labelDict)
            })
    }

    return {
        topics,
        labels,
        addTopic,
        addLabel,
        save,
        load,
        currentTopic,
        currentLabel,
        changeTopic (topic) {
            setCurrentTopicId(topic.name)
        },
        changeLabel (label) {
            setCurrentLabelId(label.name)
        }
    }
}


const Workspace = () => {
    const views = {
        main: 'main',
        topicPage: 'topicPage',
        labelPage: 'labelPage'
    }
    const store = useStore()
    const {topics, labels} = store
    const [topicName, setTopicName] = useState('')
    const [labelName, setLabelName] = useState('')
    const [topicDescription, setTopicDescription] = useState('')
    const [view, setView] = useState(views.main)

    const addTopic = () => {
        store.addTopic({name: topicName})
        setTopicName('')
    }
    const addLabel = () => {
        store.addLabel({name: labelName})
        setLabelName('')
    }
    
    const toTopicPage = (topic) => {
        store.changeTopic(topic)
        setView(views.topicPage)
    }

    const onSave = () => store.save()

    const onLoad = () => store.load()

    const onChangeTopicName = e => setTopicName(e.target.value)

    const toLabelPage = () => setView(views.labelPage)


    const mainPage = (
        <Fragment>
            <Area key='1'> 
                Current topics: 
                {topics.map(topic => <TopicItem key={topic.name} topic={topic} onClick={() => toTopicPage(topic)} />)}
                <br/>
                Current labels: 
                {labels.map(label => <LabelItem key={label.name} label={label} onClick={toLabelPage} />)}
            </Area>
            <Area key='2'> 
                Create a topic: <br/>
                Name: <input value={topicName} onChange={onChangeTopicName} /> <br/>
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

    const doSwitch = () => {
        switch (view) {
            case views.main: return mainPage
            case views.topicPage: return <TopicPage topic={store.currentTopic} />
            case views.labelPage: return <LabelPage />
            default: return mainPage
        }
    }

    return (
        <Fragment> 
            {doSwitch()}
            <DoButton text="to main page" onClick={() => setView(views.main)} />
        </Fragment>
    )
}

export default  Workspace