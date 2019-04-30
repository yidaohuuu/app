import React from 'react'

export default function ControlTag ({colorClass = "is-link", text = '', onClick}) {
    return (
        <div className="control" onClick={onClick}>
            <a className={`tag ${colorClass}`}>{text}</a>
        </div>
    )
}

