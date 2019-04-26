import React from 'react'
import ItemListWrapper from './ItemListWrapper'

const List = ({ list, renderContent }) => {
    return (
        list.length > 0
            ? (
                <ItemListWrapper>
                    {list.map(item => {
                        return (renderContent(item))
                    })}
                </ItemListWrapper>
            )
            : 'None'
    )
}

export default List