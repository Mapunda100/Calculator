import React from 'react';
import './Screen.css'

const Screen = ({value}) => {
    return (
        <div>
            <input className='screen' type='text' value={value} readOnly></input>
        </div>
    );
};

export default Screen;