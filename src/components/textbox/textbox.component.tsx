import React from 'react';
import './textbox.styles.scss';

interface IProps {
  placeholder: string;
  type?: 'text' | 'password';
  className?: string;
  width?: string;
}

export default function Textbox ({
  placeholder,
  type = 'text',
  className,
  width = '100%'
}: IProps){
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`textbox ${className}`}
      style={{ width: width }}
    />
  );
}
