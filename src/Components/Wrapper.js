import React from 'react';
import './Wrapper.css';

const Wrapper = ({children}) => {
    return (
        <div>
            <div className='wrapper'>{ children}</div>
        </div>
    );
};

export default Wrapper;