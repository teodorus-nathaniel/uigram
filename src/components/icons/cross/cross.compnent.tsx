import React from 'react';
import Icon from '../icon.component';
import { IProps } from '../icon.interfaces';

export default function CrossIcon(props: IProps) {
    return (
        <Icon viewBox='0 0 24 24' {...props}>
            <path d='M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z' fill='currentColor' />
        </Icon>
    );
}