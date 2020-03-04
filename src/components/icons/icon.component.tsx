import React from 'react';
import './icon.styles.scss';

export default function Icon ({
  viewBox,
  children,
  rotate = 360,
  size = 2,
  color = '#434343'
}: {
  viewBox: string;
  children: any;
  rotate?: number;
  size?: number;
  color?: string;
}){
  return (
    <div
      className='icon'
      style={{ width: `${size}em`, height: `${size}em`, color }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        width='1em'
        height='1em'
        style={{ transform: `rotate(${rotate}deg)`, fontSize: `${size}em` }}
        preserveAspectRatio='xMidYMid meet'
        viewBox={viewBox}>
        {children}
      </svg>
    </div>
  );
}
