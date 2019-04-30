import React, { Fragment } from 'react'
import Hero from './Hero'
import Card from './Card'
import DeleteTag from './DeleteTag'
import ItemListWrapper from './ItemListWrapper'

export default function LabelPage({ label, store }) {
    const topics = store.getTopicsByLabel(label)
    const onRemoveTopic = (topic) => {
        alert('wanted to remove this topic', topic.name)
    }
    // jjtodo: for topics in this labels page, should probably use a tag without deletion 
    // feature.
    const topicsView = topics.length > 0
        ? (
            <ItemListWrapper>
                {
                    topics.map(topic => (
                        <DeleteTag key={topic.id} item={topic} onClick={() => { }} onDelete={() => onRemoveTopic(topic)} />
                    ))
                }
            </ItemListWrapper>
        )
        : ''
    return (
        <Fragment>
            <Hero title={label.name} description={label.description} />
            <Card title="Topics">
                {topicsView}
            </Card>
        </Fragment>
    )
}