import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function BookmarkIcon(props: IProps) {
	return (
		<Icon viewBox="0 0 24 24" {...props}>
			<path
				d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"
				fill={props.color}
			/>
		</Icon>
	);
}
