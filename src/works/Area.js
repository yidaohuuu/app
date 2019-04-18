import React from 'react';

const Area = (props) => (
    <div style={{border: '1px solid black', margin: '20px', padding: '10px'}}> 
        {props.children}
    </div>
)

export default Area