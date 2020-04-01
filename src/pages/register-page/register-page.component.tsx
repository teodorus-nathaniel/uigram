import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import IdeasImage from './../../assets/images/ideas-undraw.svg';
import { validateEmail, validateUsername } from '../../utils/validations';
import useForm from '../../effects/useForm.effect';

export default function RegisterPage (){
  const [ data, handleChange, handleSubmit, submitErrors ] = useForm(
    {
      email: {
        value: '',
        validation: validateEmail,
        error: ''
      },
      username: {
        value: '',
        validation: validateUsername,
        error: ''
      },
      fullname: {
        value: ''
      },
      password: {
        value: ''
      },
      confirmPassword: {
        value: '',
        isPasswordConfirmation: true,
        error: ''
      }
    },
    () => {}
  );

  const { email, fullname, password, username, confirmPassword } = data;

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
      error={submitErrors}
      onSubmit={handleSubmit}>
      <InputField
        errorMessage={email.error}
        type='text'
        name='email'
        label='Email'
        value={email.value}
        onChange={handleChange}
      />
      <InputField
        errorMessage={username.error}
        type='text'
        name='username'
        label='Username'
        value={username.value}
        onChange={handleChange}
      />
      <InputField
        type='text'
        name='fullname'
        label='Full Name'
        value={fullname.value}
        onChange={handleChange}
      />
      <InputField
        type='password'
        name='password'
        label='Password'
        value={password.value}
        onChange={handleChange}
      />
      <InputField
        errorMessage={confirmPassword.error}
        type='password'
        name='confirmPassword'
        label='Confirm Password'
        value={confirmPassword.value}
        onChange={handleChange}
      />
    </CardForm>
  );
}
