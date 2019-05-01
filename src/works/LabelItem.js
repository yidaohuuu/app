import React from 'react'
import utils from 'utils'
import DeleteTag from './DeleteTag'
import ControlTag from './ControlTag'

const LabelItem = ({label = utils.isRequired(), onClick}) => {
    return (
        <ControlTag
            onClick={onClick}
            text={label.name}
            colorClass="is-primary"
        /> 
    )
}

export default LabelItem