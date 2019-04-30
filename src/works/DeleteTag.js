import React from 'react'
import utils from 'utils'
import Tag from './Tag'
const {isRequired} = utils

const DeleteTag = ({onClick = isRequired(), item = isRequired(), onDelete = isRequired(), colorClass = 'is-link'}) => {
    return (
        <Tag {...{onClick, colorClass, item}}  addOn={(
            <a className="tag is-delete" onClick={e => onDelete(e, item)}></a>
        )} />
    )
}

export default DeleteTag