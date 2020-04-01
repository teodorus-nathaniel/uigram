import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import SharingImage from './../../assets/images/sharing-undraw.svg';
import useForm from './../../effects/useForm.effect';
import { validateEmail } from '../../utils/validations';

export default function LoginPage (){
  const [ data, handleChange, handleSubmit, submitErrors ] = useForm(
    {
      email: {
        value: '',
        validation: validateEmail,
        error: ''
      },
      password: {
        value: ''
      }
    },
    () => {}
  );

  const { email, password } = data;

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
      error={submitErrors}
      onSubmit={handleSubmit}>
      <InputField
        type='text'
        name='email'
        label='Email'
        onChange={handleChange}
        value={email.value}
        errorMessage={email.error}
      />
      <InputField
        type='password'
        name='password'
        label='Password'
        onChange={handleChange}
        value={password.value}
      />
    </CardForm>
  );
}
