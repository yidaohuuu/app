import React, { Fragment, useContext } from 'react'
import utils from 'utils'
import StoreContext from './StoreContext'
import List from './List'
import AddTopic from './addTopic/AddTopic'
import useAddTopic from './addTopic/useAddTopic'
import AddLabel from './addLabel/AddLabel'
import useAddLabel from './addLabel/useAddLabel'
import DeleteTag from './DeleteTag'
import Card from './Card'
import ItemListWrapper from './ItemListWrapper'
import PlusTag from './PlusTag'
import Hero from './Hero'

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

    const linkTopic = (one) => {
        store.linkTwoTopics(one, topic)
    }


    const linkLabel = (label) => {
        store.labelTopic(topic, label)
    }

    const removeLabel = label => {
        store.removeLabelFromTopic(topic, label)
    }

    return (
        <Fragment>
            <div style={{ 'marginBottom': '20px' }}>
                <Hero title={topic.name} description={topic.description} />
            </div>
            <Card title="Labels">
                <List {...{
                    list: myLabels,
                    renderContent: l => <DeleteTag key={l.id} colorClass="is-primary" item={l} onClick={() => { }} onDelete={() => removeLabel(l)} />,
                }} />
            </Card>
            <Card title="Topics">
                <div style={{ display: 'flex' }}>
                    <List {...{
                        list: similarTopics,
                        renderContent: t => <DeleteTag key={t.id} item={t} onClick={() => { }} onDelete={() => removeSimilarTopic(t)} />,
                    }} />
                </div>
            </Card>
            <AddTopic {...addTopicProps} />
            <AddLabel {...addLabelProps} />
            <Card title="Other Topics">
                <ItemListWrapper>
                    {otherTopics.map(topic => {
                        return (
                            <PlusTag colorClass="is-link" key={topic.id} item={topic} onAdd={() => linkTopic(topic)} />
                        )
                    })}
                </ItemListWrapper>
            </Card>
            <Card title="All Labels">
                <List {...{
                    list: store.labels,
                    renderContent: l => <PlusTag colorClass="is-primary" key={l.id} item={l} onAdd={e => linkLabel(l)} />
                }} />
            </Card>

        </Fragment>
    )
}