import React, { Fragment } from 'react'
import Hero from './Hero'
import Card from './Card'
import ItemListWrapper from './ItemListWrapper'
import ControlTag from './ControlTag'

export default function LabelPage({ label, store }) {
    const topics = store.getTopicsByLabel(label)
    // jjtodo: for topics in this labels page, should probably use a tag without deletion 
    // feature.
    const topicsView = topics.length > 0
        ? (
            <ItemListWrapper>
                {
                    topics.map(topic => (
                        <ControlTag key={topic.id} text={topic.name} onClick={() => {}} />
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