import React from 'react';
import './input-field.styles.scss';

interface IProps {
  type: HTMLInputElement['type'];
  name: string;
  label: string;
}

export default function InputField ({ type, name, label }: IProps){
  const id = Symbol(name).toString();

  return (
    <div className='input-field'>
      <input type={type} id={id} name={name} required />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
