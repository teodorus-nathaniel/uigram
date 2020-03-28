import React from 'react';
import './error-message.styles.scss';

export default function ErrorMessage ({
  message,
  size
}: {
  message: string;
  size?: number;
}){
  return (
    <div className='error-message'>
      <span style={{ fontSize: `${size || 1}em` }}>{message}</span>
    </div>
  );
}
