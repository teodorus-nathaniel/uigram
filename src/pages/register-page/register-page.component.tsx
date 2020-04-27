import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import IdeasImage from './../../assets/images/ideas-undraw.svg';
import {
  validateEmail,
  validateUsername,
  validatePassword
} from '../../utils/validations';
import useForm from '../../effects/useForm.effect';
import useGuestOnly from '../../effects/useGuestOnly';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/root-reducer';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { Dispatch } from 'redux';
import { User } from '../../@types/user.interfaces';
import { IRegisterPayload } from '../../redux/user/user.actions';

interface IProps {
  user: User | null;
  isFetching?: boolean;
  error?: string;
  register: (data: IRegisterPayload['data']) => void;
}

function RegisterPagePlain ({ user, isFetching, error, register }: IProps){
  useGuestOnly();

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
        value: '',
        validation: validatePassword,
        error: ''
      },
      confirmPassword: {
        value: '',
        isPasswordConfirmation: true,
        error: ''
      }
    },
    () => {
      register({
        email: data.email.value,
        fullname: data.email.value,
        username: data.username.value,
        password: data.password.value
      });
    }
  );

  const { email, fullname, password, username, confirmPassword } = data;

  return (
    <CardForm
      title="Welcome to UIGram !"
      actionButtonText="Register"
      additional={{
        img: IdeasImage,
        main: 'Explore new ideas',
        actionText: 'Already got an account?',
        sub: 'with us!',
        link: { text: 'Login', path: '/login' }
      }}
      isFetching={isFetching}
      error={submitErrors ? submitErrors : error ? error : ''}
      onSubmit={handleSubmit}>
      <InputField
        errorMessage={email.error}
        type="text"
        name="email"
        label="Email"
        value={email.value}
        onChange={handleChange}
      />
      <InputField
        errorMessage={username.error}
        type="text"
        name="username"
        label="Username"
        value={username.value}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="fullname"
        label="Full Name"
        value={fullname.value}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        label="Password"
        value={password.value}
        onChange={handleChange}
        errorMessage={password.error}
      />
      <InputField
        errorMessage={confirmPassword.error}
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        value={confirmPassword.value}
        onChange={handleChange}
      />
    </CardForm>
  );
}

const mapStateToProps = ({
  fetchController: {
    isFetching: { REGISTER: isFetching },
    errors: { REGISTER: error }
  },
  user: { self: { data } }
}: GlobalState) => ({
  isFetching,
  error,
  user: data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  register: (data: IRegisterPayload['data']) =>
    dispatch(fetchApi({ name: 'REGISTER', data }))
});

const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(
  RegisterPagePlain
);
export default RegisterPage;
