import React from 'react'
import Area from '../Area'

const AddLabel = ({ labelName, setLabelName, addLabel }) => {
    return (
        <Area>
            Create a label: <br />
            Name: <input value={labelName} onChange={e => setLabelName(e.target.value)} /> <br />
            <button onClick={addLabel}>Create</button>
        </Area>
    )
}

export default AddLabel