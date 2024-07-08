import React from 'react';
import './Button.css'

const Button = (props) => {
    return (
        <div>
        <button {...props} className={'button' + props.className}/>
        <h3>{props.className}</h3>
        </div>
    );
};

export default Button;