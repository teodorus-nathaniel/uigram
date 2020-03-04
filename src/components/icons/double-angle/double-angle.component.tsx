import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function DoubleAngleIcon(props: IProps) {
	return (
		<Icon viewBox="0 0 16 16" {...props}>
			<path fill={props.color} d="M14 3h-2L7 8l5 5h2L9 8z" />
			<path fill={props.color} d="M9 3H7L2 8l5 5h2L4 8z" />
		</Icon>
	);
}
