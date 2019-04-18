import React, { Fragment, useContext } from 'react'
import utils from 'utils'
import Area from './Area'
import StoreContext from './StoreContext'

const List = ({ list, getKey = a => a, renderContent }) => {
    return (
        <ul>
            {list.map(item => {
                return (
                    <li key={getKey(item)}>
                        {renderContent(item)}
                    </li>
                )
            })}
        </ul>
    )
}

export default function TopicPage({ topic = utils.isRequired(), topics }) {
    const store = useContext(StoreContext)
    const otherTopics = store.topics.filter(one => one.name != topic.name)
    const similarTopics = store.getSimilarTopics(topic)
    const myLabels = store.getLabels(topic)

    const listProps = {
        list: similarTopics,
        getKey: t => t.name,
        renderContent: t => t.name
    }
    const similarTopicList = (
        <List {...listProps} />
    )

    const linkTopic = (one) => {
        store.linkTwoTopics(one, topic)
    }

    const otherTopicList = (
        <ul>
            {otherTopics.map(topic => {
                return (
                    <Fragment key={topic.name}>
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

    const addLabel = (label) => {
        store.labelTopic(topic, label)
    }

    const removeLabel = label => {
        store.removeLabelFromTopic(topic, label)
    }

    return (
        <Fragment>
            <Area>
                <span style={spanStyle}> Name: {topic.name} </span>  <br />
                Description: {topic.description}    <br />
            </Area>
            <Area>
                Similar Topics:  <br />
                {similarTopicList}
            </Area>
            <Area>
                Labels: <br />
                <List {...{
                    list: myLabels,
                    getKey: l => l.name,
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
                    getKey: l => l.name,
                    renderContent: l => <span> {l.name} <button onClick={e => addLabel(l)}>Add</button> </span>
                }} />
            </Area>
        </Fragment>
    )
}