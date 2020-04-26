import React, { ButtonHTMLAttributes } from 'react';
import './button.styles.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: any;
  alt?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => any;
}

export default function Button ({
  alt,
  children,
  className,
  ...otherProps
}: IProps){
  return (
    <button
      className={`button ${alt ? 'alt' : ''} ${className || ''}`}
      {...otherProps}>
      {children}
    </button>
  );
}
