import type { JSX, InputHTMLAttributes } from "react";
import "./FormInput.scss";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

export function FormInput({ label, id, ...inputProps }: FormInputProps): JSX.Element {
    return (
        <div className="label-and-input-container">
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                required 
                {...inputProps}
            />
        </div>
    );
}