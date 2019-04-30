import React from 'react'

const Input = ({value, onChange}) => (
    <div className="control">
        <input type="text" className="input" value={value} onChange={onChange} />
    </div>
)

export default Input