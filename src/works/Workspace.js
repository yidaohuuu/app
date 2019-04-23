import React, {useState, Fragment} from 'react';
import TopicItem from './TopicItem'
import TopicPage from './TopicPage'
import LabelItem from './LabelItem'
import LabelPage from './LabelPage'
import Area from './Area'
import StoreContext from './StoreContext'
import useStore from './useStore'
import resource from 'resource'

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
        store.addTopic({name: topicName, description: topicDescription})
        setTopicName('')
        setTopicDescription('')
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

    const onUpload = e => {
      const target = e.target
      const files = target.files
      if (files.length > 0) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
          const graph = JSON.parse(event.target.result)
          target.value = null
          store.load(graph)
        }
        reader.readAsText(file)
      }
    }

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
            <Area>
                Load from file: <input type="file" onChange={onUpload} />
            </Area>
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
        <StoreContext.Provider value={store}>
            {doSwitch()}
            <DoButton text="to main page" onClick={() => setView(views.main)} />
        </StoreContext.Provider>
    )
}

export default  Workspace