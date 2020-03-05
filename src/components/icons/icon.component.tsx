import React from 'react';
import './icon.styles.scss';
import { useState } from 'react';

export default function Icon({
	viewBox,
	children,
	rotate = 360,
	size = 2,
	color = '#434343',
	noHover = false,
	...additionalData
}: {
	viewBox: string;
	children: any;
	rotate?: number;
	size?: number;
	color?: string;
	noHover?: boolean;
	[key: string]: any;
}) {
	const [ isHovered, setIsHovered ] = useState(false);
	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);
	return (
		<div
			onMouseEnter={noHover ? undefined : handleMouseEnter}
			onMouseLeave={noHover ? undefined : handleMouseLeave}
			className="icon"
			style={{
				width: `${size}em`,
				height: `${size}em`,
				color: isHovered ? '#007fc9' : color
			}}
			{...additionalData}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false"
				width="1em"
				height="1em"
				style={{ transform: `rotate(${rotate}deg)`, fontSize: `${size}em` }}
				preserveAspectRatio="xMidYMid meet"
				viewBox={viewBox}
			>
				{children}
			</svg>
		</div>
	);
}
