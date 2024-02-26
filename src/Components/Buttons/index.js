import React from 'react';
import './styles.css';
const Buttons = ({text,onClick,disabled,style}) => {
    return(
        <div className='input-wrapper'>
            <button className="custom-btn" onClick={onClick} disabled={disabled} style={style}>{text}</button>
        </div>
    )
}

export default Buttons;