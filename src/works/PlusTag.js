import React from 'react'
import Tag from './Tag'

const PlusTag = (props) => {
    const onAddClick = (e) => {
        e.stopPropagation()
        if (props.onAdd) {
            props.onAdd()
        }
    }
    return (
        <Tag {...props} addOn={(
            <a className='tag is-warning' onClick={onAddClick}>Link</a>
        )} />
    )
}

export default PlusTag