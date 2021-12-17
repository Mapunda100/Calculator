import React from 'react';
import './ButtonBox.css';

const ButtonBox = ({children}) => {
    return (
        <div>
            <div className='buttonBox'>{ children}</div>
        </div>
    );
};

export default ButtonBox;