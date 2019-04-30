import React from 'react'
import Field from './Field'
import Label from './Label'
import Input from './Input'

const InputField = ({label, value, onChange}) => (
    <Field>
        <Label>{label}</Label>
        <Input value={value} onChange={onChange}></Input>
    </Field>
)

export default InputField