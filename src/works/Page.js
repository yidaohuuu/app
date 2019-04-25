import React from 'react'

const Page = (props) => {
    return (
        <div style={{margin: '20px'}}> 
            {props.children}
        </div>
    )
}

export default Page