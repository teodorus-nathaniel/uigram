import React, { ChangeEvent } from 'react';
import './textbox.styles.scss';

interface IProps {
  placeholder: string;
  type?: 'text' | 'password';
  className?: string;
  width?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Textbox ({
  placeholder,
  type = 'text',
  className,
  width = '100%',
  onChange,
  value
}: IProps){
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`textbox ${className}`}
      style={{ width: width }}
      onChange={onChange}
      value={value}
    />
  );
}
