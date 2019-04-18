import React from 'react'
import utils from 'utils'


export default function TopicPage ({topic = utils.isRequired()}) {
    return (
        <div> 
            name: {topic.name}  <br/>
            description: {topic.description}
        </div>
    )
}