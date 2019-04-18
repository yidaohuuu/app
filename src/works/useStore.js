import {useState} from 'react'
import resource from 'resource'
import utils from 'utils'
const {isRequired} = utils

const labelFuncs = {
    createLabel ({name = isRequired()}) {
        return {
            name,
            similar: []
        }
    }
}

const topicFuncs = {
    createTopic ({name = isRequired(), description = '', }) {
        return {
            name,
            description,
            labels: [],
            similar: [],
            comments: [],
        }
    }
}


const createTopicLink = (topic1, topic2) => {
    return [topic1.name, topic2.name].sort() // small - big
}

const createTopicLabelLink = (topic, label) => {
    return [topic.name, label.name]
}

const useStore = () => {
    // so far we have no order
    const [topicDict, setTopicDict] = useState({})
    const [labelDict, setLabelDict] = useState({})
    const [currentTopicId, setCurrentTopicId] = useState(null)
    const [currentLabelId, setCurrentLabelId] = useState(null)
    const [topicLinks, setTopicLinks] = useState([])
    const [labelLinks, setLabelLinks] = useState([])
    const [topicLabelLinks, setTopicLabelLinks] = useState([])

    const hasTopic = currentTopicId != null
    const hasLabel = currentLabelId != null
    const currentTopic = hasTopic ? topicDict[currentTopicId] : null
    const currentLabel = hasLabel ? labelDict[currentLabelId] : null


    // derived values
    const topics = Object.values(topicDict)
    const labels = Object.values(labelDict)

    const addTopic = (attrs) => {
        const topic = topicFuncs.createTopic(attrs)
        setTopicDict({...topicDict, [topic.name]: topic})
    }

    const addLabel = (attrs) => {
        const label = labelFuncs.createLabel(attrs)
        setLabelDict({...labelDict, [label.name]: label})
    }

    const save = () => {
        const graph = {
            topicDict,
            labelDict,
            topicLinks,
            labelLinks,
            topicLabelLinks,
        }
        return resource.saveGraph(graph)
    }
    const load = () => {
        return resource.getGraph()
            .then((graph) => {
                setTopicDict(graph.topicDict)
                setLabelDict(graph.labelDict)
                setTopicLinks(graph.topicLinks)
                setLabelLinks(graph.labelLinks)
                setTopicLabelLinks(graph.topicLabelLinks)
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

    // todo: memoize if expensive
    const getSimilarTopics = (topic) => {
        const name = topic.name
        const names = []
        for (const [name1, name2] of topicLinks) {
            if (name1 === name) {
                names.push(name2)
            }
            if (name2 === name) {
                names.push(name1)
            }
        }
        return names.map(name => topicDict[name])
    }

    const getLabels = topic => {
        const name = topic.name
        const texts = []
        for (const [tname, lname] of topicLabelLinks) {
            if (name === tname) {
                texts.push(lname)
            }
        }
        return texts.map(text => labelDict[text])
    }

    const hasTopicLabelLink = (link) => {
        return topicLabelLinks.some(l => isSameLink(l, link))
    }

    const allLabels = Object.values(labelDict)

    return {
        removeLabelFromTopic (topic, label) {
            const link = createTopicLabelLink(topic, label)
            setTopicLabelLinks(topicLabelLinks.filter(l => !isSameLink(l, link)))
        },
        labelTopic (topic, label) {
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
        changeTopic (topic) {
            setCurrentTopicId(topic.name)
        },
        changeLabel (label) {
            setCurrentLabelId(label.name)
        },
        linkTwoTopics,
        topicLinks,
        getSimilarTopics,
    }
}

export default useStore