import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function CheckIcon (props: IProps){
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M9.392 17.919l-6.53-6.122l1.026-1.094l5.47 5.128L20.094 5.095l1.061 1.061L9.391 17.92z"
        fill="currentColor"
      />
    </Icon>
  );
}
