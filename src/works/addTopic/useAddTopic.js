import { useState, useContext } from 'react'

function useAddTopic(store) {
    const [topicName, setTopicName] = useState('')
    const [topicDescription, setTopicDescription] = useState('')
    const addTopic = () => {
        const added = store.addTopic({ name: topicName, description: topicDescription })
        setTopicName('')
        setTopicDescription('')
        return added
    }
    const onChangeTopicName = e => setTopicName(e.target.value)
    return {
        topicName,
        topicDescription,
        addTopic,
        onChangeTopicName,
        setTopicDescription,
    }
}

export default useAddTopic