import {useState} from 'react'

function useAddLabel(store) {
    const [labelName, setLabelName] = useState('')
    const addLabel = () => {
        const added = store.addLabel({ name: labelName })
        setLabelName('')
        return added
    }
    return {
        labelName,
        setLabelName,
        addLabel
    }
}

export default useAddLabel