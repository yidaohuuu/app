import React from 'react'
import utils from 'utils'
import Item from './Item'

const LabelItem = ({label = utils.isRequired(), onClick}) => {
    return (
        <Item 
            onClick={onClick}
            item={label}
            onDelete={utils.stopPropagation}
            colorClass="is-primary"
        > 
            {label.name} 
        </Item>
    )
}

export default LabelItem