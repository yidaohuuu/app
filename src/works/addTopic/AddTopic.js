import React from 'react'
import Card from '../Card'
import Input from '../Input'
import Label from '../Label'
import Field from '../Field'
import FooterLink from '../FooterLink'

const AddTopic = ({ topicName, onChangeTopicName, topicDescription, setTopicDescription, addTopic }) => {
    return (
        <Card title="Add Topic" footer={(
            <FooterLink text="Add" onClick={addTopic} />
        )}>
            <Field>
                <Label>Name</Label>
                <Input value={topicName} onChange={onChangeTopicName} />
            </Field>
            <Field>
                <Label>Description</Label>
                <Input value={topicDescription} onChange={e => setTopicDescription(e.target.value)} />
            </Field>
        </Card>
    )
}

export default AddTopic