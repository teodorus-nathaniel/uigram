import React from 'react';
import CardForm from '../../components/card-form/card-form.component';
import InputField from '../../components/input-field/input-field.component';
import SharingImage from './../../assets/images/sharing-undraw.svg';
import useForm from './../../effects/useForm.effect';
import { validateEmail, validatePassword } from '../../utils/validations';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { GlobalState } from '../../redux/root-reducer';
import useGuestOnly from '../../effects/useGuestOnly';

interface IProps {
  isFetching?: boolean;
  error?: string;
  userChecking?: boolean;
  login: (data: { email: string; password: string }) => void;
}

function LoginPagePlain ({ login, isFetching, error, userChecking }: IProps){
  useGuestOnly();
  const [ data, handleChange, handleSubmit, submitErrors ] = useForm(
    {
      email: {
        value: '',
        validation: validateEmail,
        error: ''
      },
      password: {
        value: '',
        validation: validatePassword,
        error: ''
      }
    },
    () => {
      login({ email: data.email.value, password: data.password.value });
    }
  );

  const { email, password } = data;

  if (userChecking) return null;

  return (
    <CardForm
      title="Welcome back!"
      actionButtonText="Login"
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
        type="text"
        name="email"
        label="Email"
        onChange={handleChange}
        value={email.value}
        errorMessage={email.error}
      />
      <InputField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
        value={password.value}
        errorMessage={password.error}
      />
    </CardForm>
  );
}

const mapStateToProps = ({
  fetchController: {
    isFetching: { LOGIN: isFetching, CHECK_USER: userChecking },
    errors: { LOGIN: error }
  }
}: GlobalState) => ({
  isFetching,
  error,
  userChecking
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (data: { email: string; password: string }) =>
    dispatch(fetchApi({ name: 'LOGIN', data }))
});

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPagePlain);
export default LoginPage;
