import React from 'react'

export default function ItemListWrapper ({children}) {
    return (
        <div className="field is-grouped is-grouped-multiline">
            {children}
        </div>
    )
}


