import React from 'react';
import moment from 'moment';
import './timestamp.styles.scss';

interface IProps {
  timestamp: number;
  className?: string;
}

export default function Timestamp ({ timestamp, className }: IProps){
  return (
    <span className={`timestamp ${className || ''}`}>
      {moment(timestamp * 1000).fromNow()}
    </span>
  );
}
