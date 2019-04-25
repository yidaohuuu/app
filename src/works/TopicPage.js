import React, { Fragment, useContext, useState } from 'react'
import utils from 'utils'
import Area from './Area'
import StoreContext from './StoreContext'
import List from './List'
import AddTopic from './addTopic/AddTopic'
import useAddTopic from './addTopic/useAddTopic'
import AddLabel from './addLabel/AddLabel'
import useAddLabel from './addLabel/useAddLabel'

export default function TopicPage({ topic = utils.isRequired(), topics }) {
    const store = useContext(StoreContext)
    const otherTopics = store.topics.filter(one => one.id != topic.id)
    const similarTopics = store.getSimilarTopics(topic)
    const myLabels = store.getLabels(topic)
    const rawAddTopic = useAddTopic(store)
    const addTopicProps = {
        ...rawAddTopic,
        addTopic () {
            const added = rawAddTopic.addTopic()
            store.linkTwoTopics(added, topic)
        }
    }
    const rawAddLabel = useAddLabel(store)
    const addLabelProps = {
        ...rawAddLabel,
        addLabel () {
            const added = rawAddLabel.addLabel()
            store.labelTopic(topic, added)
        }
    }

    const removeSimilarTopic = one => {
        store.removeTopicLink(one, topic)
    }

    const similarTopicList = (
        <List {...{
            list: similarTopics,
            getKey: t => t.id,
            renderContent: t => <span> {t.name} <button onClick={e => removeSimilarTopic(t)}>Remove</button> </span>
        }} />
    )

    const linkTopic = (one) => {
        store.linkTwoTopics(one, topic)
    }

    const otherTopicList = (
        <ul>
            {otherTopics.map(topic => {
                return (
                    <Fragment key={topic.id}>
                        <li> {topic.name} <button onClick={() => linkTopic(topic)}> link </button> </li>
                    </Fragment>
                )
            })}
        </ul>
    )

    const spanStyle = {
        border: '1px solid black',
        backgroundColor: 'yellow'
    }

    const linkLabel = (label) => {
        store.labelTopic(topic, label)
    }

    const removeLabel = label => {
        store.removeLabelFromTopic(topic, label)
    }

    const [editName, setEditName] = useState(topic.name)
    const [editDescription, setEditDescription] = useState(topic.description)

    const doEditCurrentTopic = () => {
        const updated = {...topic, name: editName, description: editDescription}
        store.updateTopic(updated)
    }

    return (
        <Fragment>
            <Area>
                <div style={spanStyle}>
                    Name: <br />
                    <input value={editName} onChange={e => setEditName(e.target.value)} />
                </div>
                <div>
                    Description: <br />
                    <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                </div>
                <button onClick={doEditCurrentTopic}>Save Changes</button>
            </Area>
            <AddTopic {...addTopicProps} />
            <AddLabel {...addLabelProps} />
            <Area>
                Similar Topics:  <br />
                {similarTopicList}
            </Area>
            <Area>
                Labels: <br />
                <List {...{
                    list: myLabels,
                    getKey: l => l.id,
                    renderContent: l => <span> {l.name} <button onClick={e => removeLabel(l)}>Remove</button> </span>
                }} />
            </Area>
            <Area>
                Other nodes: <br />
                {otherTopicList}
            </Area>
            <Area>
                All labels: <br />
                <List {...{
                    list: store.labels,
                    getKey: l => l.id,
                    renderContent: l => <span> {l.name} <button onClick={e => linkLabel(l)}>Add</button> </span>
                }} />
            </Area>
        </Fragment>
    )
}