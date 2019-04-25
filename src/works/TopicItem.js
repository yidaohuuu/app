import React, { useContext } from 'react'
import StoreContext from './StoreContext'
import utils from 'utils'
const { isRequired } = utils

const style = {
    border: '1px solid black',
    margin: '5px',
    padding: '3px',
    maxWidth: '100px',
    display: 'inline-block',
    backgroundColor: 'yellow'
}


// todo: import isRequired from top util service
const TopicItem = ({ topic = isRequired(), onClick = isRequired() }) => {
    const store = useContext(StoreContext)
    const removeTopic = (e, topic) => {
        e.stopPropagation()
        store.removeTopic(topic)
    }
    return (
        <div
            onClick={onClick}
            style={style}
        >
            {topic.name}
            <span onClick={e => removeTopic(e, topic)}>X</span>
        </div>
    )
}

export default TopicItem