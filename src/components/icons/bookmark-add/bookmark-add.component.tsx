import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function BookmarkAddIcon (props: IProps){
  return (
    <Icon viewBox='0 0 24 24' {...props}>
      <path
        d='M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9h-3v3h-2v-3H8V9h3V6h2v3h3v2z'
        fill='currentColor'
      />
    </Icon>
  );
}
