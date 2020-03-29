import React from 'react';
import './button.styles.scss';

interface IProps {
  className?: string;
  children: any;
  type?: 'button' | 'submit';
  onClick?: () => any;
}

export default function Button ({ children, className, ...otherProps }: IProps){
  return (
    <button className={`button ${className || ''}`} {...otherProps}>
      {children}
    </button>
  );
}
