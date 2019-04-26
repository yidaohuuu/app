import React from 'react'
import utils from 'utils'
const {isRequired} = utils

const Item = ({onClick = isRequired(), item = isRequired(), onDelete = isRequired(), colorClass = 'is-link'}) => {
    return (
        <div className="control"
            onClick={onClick}
        >
            <div className="tags has-addons">
                <a className={`tag ${colorClass}`}>{item.name}</a>
                <a className="tag is-delete" onClick={e => onDelete(e, item)}></a>
            </div>
        </div>
    )
}

export default Item