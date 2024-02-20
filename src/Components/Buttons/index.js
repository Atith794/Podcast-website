import React from 'react';
import './styles.css';
const Buttons = ({text,onClick,disabled}) => {
    return(
        <div className='input-wrapper'>
            <button className="custom-btn" onClick={onClick} disabled={disabled}>{text}</button>
        </div>
    )
}

export default Buttons;