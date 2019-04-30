import { useState } from 'react'
import resource from 'resource'
import utils from 'utils'
import useId from 'useId'
const { isRequired } = utils


const createTopicLink = (topic1, topic2) => {
    return [topic1.id, topic2.id].sort() // small - big
}

const createTopicLabelLink = (topic, label) => {
    return [topic.id, label.id]
}

const useStore = () => {
    // so far we have no order
    const idGenerator = useId()
    const labelFuncs = {
        // could refactor out the core if new id is not needed
        createLabel({ name = isRequired() }) {
            return {
                id: idGenerator.generate(),
                name,
                similar: []
            }
        }
    }
    const topicFuncs = {
        createTopic({ name = isRequired(), description = '', }) {
            return {
                id: idGenerator.generate(),
                name,
                description,
                labels: [],
                similar: [],
                comments: [],
            }
        }
    }
    const [topicDict, setTopicDict] = useState({})
    const [labelDict, setLabelDict] = useState({})
    const [currentTopicId, setCurrentTopicId] = useState(-1)
    const [currentLabelId, setCurrentLabelId] = useState(-1)
    const [topicLinks, setTopicLinks] = useState([])
    const [labelLinks, setLabelLinks] = useState([])
    const [topicLabelLinks, setTopicLabelLinks] = useState([])

    const hasTopic = currentTopicId > -1
    const hasLabel = currentLabelId > -1
    const currentTopic = hasTopic ? topicDict[currentTopicId] : null
    const currentLabel = hasLabel ? labelDict[currentLabelId] : null

    // derived values
    const topics = Object.values(topicDict)
    const labels = Object.values(labelDict)


    const addTopic = (attrs) => {
        const topic = topicFuncs.createTopic(attrs)
        setTopicDict({ ...topicDict, [topic.id]: topic })
        return topic
    }

    const addLabel = (attrs) => {
        const label = labelFuncs.createLabel(attrs)
        setLabelDict({ ...labelDict, [label.id]: label })
        return label
    }

    const save = () => {
        const graph = {
            id: idGenerator.id,
            topicDict,
            labelDict,
            topicLinks,
            labelLinks,
            topicLabelLinks,
        }
        return resource.saveGraph(graph)
    }

    const load = (graph) => {
        idGenerator.restore(graph.id)
        setTopicDict(graph.topicDict)
        setLabelDict(graph.labelDict)
        setTopicLinks(graph.topicLinks)
        setLabelLinks(graph.labelLinks)
        setTopicLabelLinks(graph.topicLabelLinks)
    }

    const loadFromServer = () => {
        return resource.getGraph()
            .then((graph) => {
                load(graph)
            })
    }

    const isSameLink = (l1, l2) => {
        return l1[0] === l2[0] && l1[1] === l2[1]
    }

    const hasTopicLink = (link) => {
        return topicLinks.some(one => isSameLink(link, one))
    }

    const linkTwoTopics = (a, b) => {
        const link = createTopicLink(a, b)
        if (!hasTopicLink(link)) {
            setTopicLinks([...topicLinks, link])
        }
    }

    // todo: might need to memoize
    const getTopicsByLabel = (label) => {
        const id = label.id
        const topicIds = []
        for (const [topicId, labelId] of topicLabelLinks) {
            if (labelId === id) {
                topicIds.push(topicId)
            }
        }
        return topicIds.map(topicId => topicDict[topicId])
    }

    // todo: memoize if expensive
    const getSimilarTopics = (topic) => {
        const id = topic.id
        const ids = []
        for (const [id1, id2] of topicLinks) {
            if (id1 === id) {
                ids.push(id2)
            }
            if (id2 === id) {
                ids.push(id1)
            }
        }
        return ids.map(id => topicDict[id])
    }

    const getLabels = topic => {
        const id = topic.id
        const ids = []
        for (const [tid, lid] of topicLabelLinks) {
            if (id === tid) {
                ids.push(lid)
            }
        }
        return ids.map(id => labelDict[id])
    }

    const hasTopicLabelLink = (link) => {
        return topicLabelLinks.some(l => isSameLink(l, link))
    }

    const allLabels = Object.values(labelDict)

    const notEqualTo = link => l => !isSameLink(link, l)

    return {
        getTopicsByLabel,
        removeTopicLink(t1, t2) {
            const link = createTopicLink(t1, t2)
            setTopicLinks(topicLinks.filter(notEqualTo(link)))
        },
        removeLabelFromTopic(topic, label) {
            const link = createTopicLabelLink(topic, label)
            setTopicLabelLinks(topicLabelLinks.filter(notEqualTo(link)))
        },
        labelTopic(topic, label) {
            const link = createTopicLabelLink(topic, label)
            if (!hasTopicLabelLink(link)) {
                setTopicLabelLinks([...topicLabelLinks, link])
            }
        },
        getLabels,
        topics,
        labels,
        addTopic,
        addLabel,
        save,
        load,
        currentTopic,
        currentLabel,
        changeTopic(topic) {
            setCurrentTopicId(topic.id)
        },
        changeLabel(label) {
            setCurrentLabelId(label.id)
        },
        linkTwoTopics,
        topicLinks,
        getSimilarTopics,
        updateTopic(newOne) {
            setTopicDict({ ...topicDict, [newOne.id]: newOne })
        },
        removeTopic(topic) {
            // remove from dict
            // TODO: The problem, entries will return string
            const newDict = Object.fromEntries(
                Object.entries(topicDict).filter(entry => entry[0] != topic.id)
            )
            setTopicDict(newDict)

            // remove relations
            setTopicLinks(topicLinks.filter(([id1, id2]) => id1 !== topic.id && id2 !== topic.id))
            setTopicLabelLinks(topicLabelLinks.filter(([id]) => id !== topic.id))
        }
    }
}

export default useStore