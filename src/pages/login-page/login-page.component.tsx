import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import SharingImage from './../../assets/images/sharing-undraw.svg';

export default function LoginPage (){
  return (
    <CardForm
      title='Welcome back!'
      actionButtonText='Login'
      additional={{
        actionText: "Don't have an account yet?",
        img: SharingImage,
        main: 'Share your design',
        sub: 'and discuss it with our community!',
        link: { text: 'Register', path: '/register' }
      }}
      onSubmit={() => {}}>
      <InputField type='text' name='email' label='Email' />
      <InputField type='password' name='password' label='Password' />
    </CardForm>
  );
}
