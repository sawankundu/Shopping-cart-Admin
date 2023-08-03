import { useState } from 'react';
import './formInput.css'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMsg, onChange, id, ...inputProps } = props;
    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="fromInput">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                onBlur={handleFocus}
                required="required"
                focused={focused.toString()}
            />
            <span>{errorMsg}</span>
        </div>
    )
}

export default FormInput;