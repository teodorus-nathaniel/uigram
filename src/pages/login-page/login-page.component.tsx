import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import SharingImage from './../../assets/images/sharing-undraw.svg';
import useForm from './../../effects/useForm.effect';
import { validateEmail } from '../../utils/validations';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { GlobalState } from '../../redux/root-reducer';
import { User } from '../../@types/user.interfaces';
import useGuestOnly from '../../effects/useGuestOnly';

interface IProps {
  isFetching?: boolean;
  error?: string;
  user: User | null;
  login: (data: { email: string; password: string }) => void;
}

function LoginPagePlain ({ login, isFetching, error, user }: IProps){
  useGuestOnly();

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
    () => {
      login({ email: data.email.value, password: data.password.value });
    }
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
      isFetching={isFetching}
      error={submitErrors ? submitErrors : error ? error : ''}
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

const mapStateToProps = ({
  fetchController: {
    isFetching: { LOGIN: isFetching },
    errors: { LOGIN: error }
  },
  user: { self: { data } }
}: GlobalState) => ({
  isFetching,
  error,
  user: data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (data: { email: string; password: string }) =>
    dispatch(fetchApi({ name: 'LOGIN', data }))
});

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPagePlain);
export default LoginPage;
