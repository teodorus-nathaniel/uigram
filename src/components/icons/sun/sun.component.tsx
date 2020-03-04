import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function SunIcon(props: IProps) {
	return (
		<Icon viewBox="0 0 24 24" {...props}>
			<path
				d="M12 4.875c-3.929 0-7.125 3.196-7.125 7.125S8.071 19.125 12 19.125s7.125-3.196 7.125-7.125S15.929 4.875 12 4.875zm0 12.75a5.624 5.624 0 1 1 0-11.25A5.624 5.624 0 0 1 17.625 12A5.632 5.632 0 0 1 12 17.625z"
				fill={props.color}
			/>
			<path d="M11.25.75h1.5V3h-1.5V.75z" fill={props.color} />
			<path d="M11.25 21h1.5v2.25h-1.5V21z" fill={props.color} />
			<path d="M21 11.25h2.25v1.5H21v-1.5z" fill={props.color} />
			<path d="M.75 11.25H3v1.5H.75v-1.5z" fill={props.color} />
			<path
				d="M18.22 19.28l1.061-1.061l1.5 1.5l-1.061 1.061l-1.5-1.5z"
				fill={props.color}
			/>
			<path
				d="M3.22 4.28l1.061-1.061l1.5 1.5L4.72 5.78l-1.5-1.5z"
				fill={props.color}
			/>
			<path
				d="M3.22 19.72l1.5-1.5l1.061 1.061l-1.5 1.5L3.22 19.72z"
				fill={props.color}
			/>
			<path
				d="M18.22 4.72l1.5-1.5l1.061 1.061l-1.5 1.5L18.22 4.72z"
				fill={props.color}
			/>
		</Icon>
	);
}
