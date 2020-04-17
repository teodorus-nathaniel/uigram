import React from 'react';
import './icon.styles.scss';

export default function IconImage ({
  src,
  alt = 'icon',
  size = 2
}: {
  src: string;
  alt?: string;
  size?: number;
}){
  return (
    <div className='icon' style={{ width: `${size}rem`, height: `${size}rem` }}>
      <img src={src} alt={alt} />
    </div>
  );
}
