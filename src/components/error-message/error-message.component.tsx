import React from 'react';
import './error-message.styles.scss';

export default function ErrorMessage ({ message }: { message: string }){
  return (
    <div className='error-message'>
      <span>{message}</span>
    </div>
  );
}
