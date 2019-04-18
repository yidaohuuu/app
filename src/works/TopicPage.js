import React, {Fragment, useContext} from 'react'
import utils from 'utils'
import Area from './Area'
import StoreContext from './StoreContext'


export default function TopicPage ({topic = utils.isRequired(), topics}) {
    const store = useContext(StoreContext)
    const otherTopics = store.topics.filter(one => one.name != topic.name)

    const linkTopic = (other) => {
        store.linkTwoTopics(topic, other)
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
    
    return (
        <Fragment>
            <Area> 
                Name: {topic.name}  <br/>
                Description: {topic.description}    <br/>
                Similar Topics: 
            </Area>
            <Area>
                {otherTopicList}
            </Area>
            <Area>
                links: &nbsp;
                {store.topicLinks.map(pair => pair.join('=>')).join(', ')}
            </Area>
        </Fragment>
    )
}