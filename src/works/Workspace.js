import React, { useState, Fragment } from 'react';
import TopicItem from './TopicItem'
import TopicPage from './TopicPage'
import LabelItem from './LabelItem'
import LabelPage from './LabelPage'
import Area from './Area'
import StoreContext from './StoreContext'
import useStore from './useStore'
import AddTopic from './addTopic/AddTopic'
import useAddTopic from './addTopic/useAddTopic'
import useAddLabel from './addLabel/useAddLabel'
import AddLabel from './addLabel/AddLabel'
import Page from './Page'
import ItemListWrapper from './ItemListWrapper'
import Card from './Card'
import Button from './Button'
import FileInput from './FileInput'
import ControlTag from './ControlTag'

const DoButton = ({ text, onClick }) => {
    return (
        <Area>
            <Button onClick={onClick}>{text}</Button>
        </Area>
    )
}

const Save = ({ onClick }) => {
    return <DoButton onClick={onClick} text="Save" />
}

const Workspace = () => {
    const views = {
        main: 'main',
        topicPage: 'topicPage',
        labelPage: 'labelPage'
    }
    const store = useStore()
    const { topics, labels } = store
    const [view, setView] = useState(views.main)

    const toTopicPage = (topic) => {
        store.changeTopic(topic)
        setView(views.topicPage)
    }

    const onSave = () => store.save()

    const onLoad = () => store.load()


    const toLabelPage = (label) => {
        store.changeLabel(label)
        setView(views.labelPage)
    }
    

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
            <Card title='Topics'>
                {
                    topics.length > 0
                        ? (<ItemListWrapper>
                                {topics.map(topic => <TopicItem key={topic.name} topic={topic} onClick={() => toTopicPage(topic)} />)}
                           </ItemListWrapper>)
                        : 'None'
                }
            </Card>
            <Card title="Labels">
                {
                    labels.length > 0
                        ? (<ItemListWrapper>
                                {labels.map(label => <LabelItem key={label.name} label={label} onClick={() => toLabelPage(label)} />)}
                          </ItemListWrapper>)
                        : 'None'
                }
            </Card>
            <AddTopic {...useAddTopic(store)} />
            <AddLabel {...useAddLabel(store)} />
            <Save onClick={onSave} />
            <Area>
                <FileInput onChange={onUpload} />
            </Area>
        </Fragment>
    )

    const doSwitch = () => {
        switch (view) {
            case views.main: return mainPage
            case views.topicPage: return <TopicPage topic={store.currentTopic} />
            case views.labelPage: return <LabelPage label={store.currentLabel} store={store} />
            default: return mainPage
        }
    }

    return (
        <StoreContext.Provider value={store}>
            <Page>
                {doSwitch()}
                <DoButton text="to main page" onClick={() => setView(views.main)} />
            </Page>
        </StoreContext.Provider>
    )
}

export default Workspace