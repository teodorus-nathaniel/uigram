import React from 'react';
import moment from 'moment';
import './timestamp.styles.scss';

interface IProps {
  timestamp: Date;
  className?: string;
}

export default function Timestamp ({ timestamp, className }: IProps){
  return (
    <span className={`timestamp ${className || ''}`}>
      {moment(timestamp).fromNow()}
    </span>
  );
}
