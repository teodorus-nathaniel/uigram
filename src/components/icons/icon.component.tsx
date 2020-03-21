import React from 'react';
import './icon.styles.scss';
import { useState } from 'react';
import { GlobalState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  viewBox: string;
  children: any;
  className?: string;
  rotate?: number;
  size?: number;
  color?: string;
  defaultColor: string;
  noHover?: boolean;
  dispatch: Dispatch;
  [key: string]: any;
}

function IconPlain ({
  viewBox,
  children,
  rotate = 360,
  size = 2,
  color,
  noHover = false,
  defaultColor,
  className,
  dispatch,
  ...additionalData
}: IProps){
  const [ isHovered, setIsHovered ] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      onMouseEnter={noHover ? undefined : handleMouseEnter}
      onMouseLeave={noHover ? undefined : handleMouseLeave}
      className={`icon ${className || ''}`}
      style={{
        width: `${size}em`,
        height: `${size}em`,
        color: isHovered ? '#007fc9' : color ? color : defaultColor
      }}
      {...additionalData}>
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
const mapStateToProps = ({ colorMode: { inDarkMode } }: GlobalState) => ({
  defaultColor: inDarkMode ? 'white' : 'black'
});

const Icon = connect(mapStateToProps)(IconPlain);
export default Icon;
