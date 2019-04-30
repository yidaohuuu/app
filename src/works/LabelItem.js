import React from 'react'
import utils from 'utils'
import DeleteTag from './DeleteTag'

const LabelItem = ({label = utils.isRequired(), onClick}) => {
    return (
        <DeleteTag
            onClick={onClick}
            item={label}
            onDelete={utils.stopPropagation}
            colorClass="is-primary"
        /> 
    )
}

export default LabelItem