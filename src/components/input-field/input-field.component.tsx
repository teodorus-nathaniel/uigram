import React, { InputHTMLAttributes } from 'react';
import './input-field.styles.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
}

export default function InputField ({
  name,
  label,
  className,
  errorMessage,
  value,
  ...otherProps
}: IProps){
  return (
    <div
      className={`input-field ${className || ''} ${errorMessage && value
        ? 'not-valid'
        : ''}`}>
      <input {...otherProps} id={name} name={name} value={value} required />
      <label htmlFor={name}>{label}</label>
      {errorMessage && value ? (
        <span className="error-message">{errorMessage}</span>
      ) : null}
      <div className="after-element" />
    </div>
  );
}
