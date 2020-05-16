import React, { ButtonHTMLAttributes } from 'react';
import './button.styles.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: any;
  alt?: boolean;
  red?: boolean;
  full?: boolean;
  type?: 'button' | 'submit';
  onClick?: (e?: any) => any;
}

export default function Button ({
  alt,
  children,
  className,
  full,
  red,
  ...otherProps
}: IProps){
  return (
    <button
      className={`button ${alt ? 'alt' : ''} ${red ? 'red' : ''} ${full
        ? 'full'
        : ''} ${className || ''}`}
      {...otherProps}>
      {children}
    </button>
  );
}
