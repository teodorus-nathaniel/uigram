import React from 'react';
import './button.styles.scss';

interface IProps {
  className?: string;
  children: any;
  onClick?: () => any;
}

export default function Button ({ children, className, ...otherProps }: IProps){
  console.log({ children });
  return (
    <button className={`button ${className || ''}`} {...otherProps}>
      {children}
    </button>
  );
}
