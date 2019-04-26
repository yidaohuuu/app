import React, { Fragment, useContext, useState } from 'react'
import utils from 'utils'
import Area from './Area'
import StoreContext from './StoreContext'
import List from './List'
import AddTopic from './addTopic/AddTopic'
import useAddTopic from './addTopic/useAddTopic'
import AddLabel from './addLabel/AddLabel'
import useAddLabel from './addLabel/useAddLabel'
import Item from './Item'

const Hero = ({ title, description }) => (
    <section className="hero is-dark">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                    {title}
                </h1>
                <h2 className="subtitle">
                    {description}
                </h2>
            </div>
        </div>
    </section>
)

export default function TopicPage({ topic = utils.isRequired(), topics }) {
    const store = useContext(StoreContext)
    const otherTopics = store.topics.filter(one => one.id != topic.id)
    const similarTopics = store.getSimilarTopics(topic)
    const myLabels = store.getLabels(topic)
    const rawAddTopic = useAddTopic(store)
    const addTopicProps = {
        ...rawAddTopic,
        addTopic() {
            const added = rawAddTopic.addTopic()
            store.linkTwoTopics(added, topic)
        }
    }
    const rawAddLabel = useAddLabel(store)
    const addLabelProps = {
        ...rawAddLabel,
        addLabel() {
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
            renderContent: t => <Item item={t} onClick={() => {}} onDelete={() => removeSimilarTopic(t)} />,
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


    const linkLabel = (label) => {
        store.labelTopic(topic, label)
    }

    const removeLabel = label => {
        store.removeLabelFromTopic(topic, label)
    }

    return (
        <Fragment>
            <div style={{ 'margin-bottom': '20px' }}>
                <Hero title={topic.name} description={topic.description} />
            </div>
            <Area>
                <div style={{display: 'flex'}}> 
                    <span style={{marginRight: '10px'}}>Labels: </span>
                    <div> 
                        <List {...{
                            list: myLabels,
                            renderContent: l => <Item colorClass="is-primary" item={l} onClick={() => {}} onDelete={() => removeLabel(l)} />,
                        }} />
                    </div>
                </div>
            </Area>
            <Area>
                <div style={{display: 'flex'}}> 
                    <span style={{marginRight: '10px'}}>Topics: </span>
                    {similarTopicList}
                </div>
            </Area>
            <AddLabel {...addLabelProps} />
            <AddTopic {...addTopicProps} />
            <Area>
                Other nodes: <br />
                {otherTopicList}
            </Area>
            <Area>
                All labels: <br />
                <List {...{
                    list: store.labels,
                    renderContent: l => <span> {l.name} <button onClick={e => linkLabel(l)}>Add</button> </span>
                }} />
            </Area>
        </Fragment>
    )
}