import React from 'react'

const Tag = ({addOn, colorClass, onClick, item}) => {
    return (
        <div className="control"
            onClick={onClick}
        >
            <div className="tags has-addons">
                <a className={`tag ${colorClass}`}>{item.name}</a>
                {addOn}
            </div>
        </div>
    )
}

export default Tag