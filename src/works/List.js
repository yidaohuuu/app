import React from 'react'

const List = ({ list, getKey = a => a, renderContent }) => {
    return (
        <ul>
            {list.map(item => {
                return (
                    <li key={getKey(item)}>
                        {renderContent(item)}
                    </li>
                )
            })}
        </ul>
    )
}

export default List