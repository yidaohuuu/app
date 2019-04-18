import React from 'react'
import utils from 'utils'

const style = {
    border: '1px solid black',
    margin: '5px',
    padding: '3px',
    maxWidth: '100px',
    display: 'inline-block',
    backgroundColor: 'yellow'
}


const LabelItem = ({label = utils.isRequired(), onClick}) => {
    return (
        <div 
            onClick={onClick}
            style={style}
        > 
            {label.name} 
        </div>
    )
}

export default LabelItem