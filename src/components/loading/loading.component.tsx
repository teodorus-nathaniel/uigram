import React from 'react';
import './loading.styles.scss';

export default function Loading() {
	return (
		<div className="loading">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					margin: 'auto',
					background: 'none',
					display: 'block',
					shapeRendering: 'auto'
				}}
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<path
					d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
					fill="#85a2b6"
					stroke="none"
					transform="rotate(336.022 50 51)"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						dur="1s"
						repeatCount="indefinite"
						keyTimes="0;1"
						values="0 50 51;360 50 51"
					/>
				</path>
			</svg>
		</div>
	);
}
