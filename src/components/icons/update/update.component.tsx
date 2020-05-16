import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function UpdateIcon (props: IProps){
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path
        d="M5.7 9c.4-2 2.2-3.5 4.3-3.5c1.5 0 2.7.7 3.5 1.8l1.7-2C14 3.9 12.1 3 10 3C6.5 3 3.6 5.6 3.1 9H1l3.5 4L8 9H5.7zm9.8-2L12 11h2.3c-.5 2-2.2 3.5-4.3 3.5c-1.5 0-2.7-.7-3.5-1.8l-1.7 1.9C6 16.1 7.9 17 10 17c3.5 0 6.4-2.6 6.9-6H19l-3.5-4z"
        fill="currentColor"
      />
    </Icon>
  );
}
