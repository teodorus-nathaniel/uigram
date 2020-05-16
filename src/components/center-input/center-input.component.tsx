import React, { ReactElement, ChangeEvent } from 'react';
import './center-input.styles.scss';

interface Props {
  name: string;
  label: string;
  value: string;
  className?: string;
  error?: string;
  useTextarea?: boolean;
  onChange: (e: ChangeEvent<any>) => void;
}

export default function CenterInput ({
  name,
  value,
  label,
  className,
  error,
  onChange,
  useTextarea
}: Props): ReactElement{
  return (
    <div
      className={`center-input${useTextarea ? '--textarea' : ''}  ${className ||
        ''}`}>
      {!useTextarea ? (
        <input
          className={value ? 'filled' : ''}
          type="text"
          name={name}
          value={value}
          id={name}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={value ? 'filled' : ''}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        />
      )}
      <label htmlFor={name}>
        <div className="center-input__label-bg" />
        <span>{label}</span>
      </label>
      <span className={`center-input__error${error ? '' : '--hide'}`}>
        {error}
      </span>
    </div>
  );
}
