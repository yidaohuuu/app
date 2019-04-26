import React, {useState, useContext} from 'react'
import StoreContext from './StoreContext'
import Area from './Area'

const EditTopic = ({topic}) => {
    const store = useContext(StoreContext)
    const doEditCurrentTopic = () => {
        const updated = { ...topic, name: editName, description: editDescription }
        store.updateTopic(updated)
    }
    const [editName, setEditName] = useState(topic.name)
    const [editDescription, setEditDescription] = useState(topic.description)
    const spanStyle = {
        border: '1px solid black',
        backgroundColor: 'yellow'
    }
    return (
        <Area>
            <div style={spanStyle}>
                Name: <br />
                <input value={editName} onChange={e => setEditName(e.target.value)} />
            </div>
            <div>
                Description: <br />
                <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            </div>
            <button onClick={doEditCurrentTopic}>Save Changes</button>
        </Area>
    )
}

export default EditTopic