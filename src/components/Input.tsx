import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({label, ...rest}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 300, height: '100vh'}}>
            {label && <label htmlFor={rest.id}>{label}</label>}
            <input {...rest}/>
        </div>
    )
} 

export default Input;
