import React from 'react'
import Card from '../Card'
import InputField from '../InputField'
import FooterLink from '../FooterLink'

const AddLabel = ({ labelName, setLabelName, addLabel }) => {
    return (
        <Card title="Add Label" footer={<FooterLink text="Add" onClick={addLabel} />}>
            <InputField label="Name" value={labelName} onChange={e => setLabelName(e.target.value)} />
        </Card>
    )
}

export default AddLabel