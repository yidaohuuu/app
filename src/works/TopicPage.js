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
                Other nodes: <br />
                {otherTopicList}
            </Area>
        </Fragment>
    )
}