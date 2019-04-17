import React from 'react'

const style = {
    border: '1px solid black',
    margin: '5px',
    padding: '3px',
    maxWidth: '100px',
    display: 'inline-block',
    backgroundColor: 'green'
}

// todo: import isRequired from top util service
const TopicItem = ({topic, onClick}) => {
    return (
        <div 
            onClick={onClick}
            style={style}
        > 
            {topic.name} 
        </div>
    )
}

export default TopicItem