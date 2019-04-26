import React, { useContext } from 'react'
import StoreContext from './StoreContext'
import utils from 'utils'
import Item from './Item'
const { isRequired } = utils

const TopicItem = ({ topic = isRequired(), onClick = isRequired() }) => {
    const store = useContext(StoreContext)
    const removeTopic = (e, topic) => {
        e.stopPropagation()
        store.removeTopic(topic)
    }
    return (
        <Item {...{
            onClick, item: topic, onDelete: removeTopic
        }} />
    )
}

export default TopicItem