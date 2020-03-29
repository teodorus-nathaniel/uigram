import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import IdeasImage from './../../assets/images/ideas-undraw.svg';

export default function RegisterPage (){
  return (
    <CardForm
      title='Welcome to UIGram!'
      actionButtonText='Register'
      additional={{
        img: IdeasImage,
        main: 'Explore new ideas',
        actionText: 'Already got an account?',
        sub: 'with us!',
        link: { text: 'Login', path: '/login' }
      }}
      onSubmit={() => {}}>
      <InputField type='text' name='email' label='Email' />
      <InputField type='text' name='username' label='Username' />
      <InputField type='text' name='fullname' label='Full Name' />
      <InputField type='password' name='password' label='Password' />
    </CardForm>
  );
}
