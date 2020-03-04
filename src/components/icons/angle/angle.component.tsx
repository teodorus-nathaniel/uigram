import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function AngleIcon (props: IProps){
  return (
    <Icon viewBox='0 0 16 16' {...props}>
      <path fill='currentColor' d='M12 13h-2L5 8l5-5h2L7 8z' />
    </Icon>
  );
}
