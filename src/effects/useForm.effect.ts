import { useState, ChangeEvent } from 'react';

export default function useForm<
  T extends {
    [key: string]: {
      validation?: (value: any) => string;
      value: any;
      error?: string;
      isPasswordConfirmation?: boolean;
    };
  }
> (
  initialState: T,
  successSubmit: () => void
): [T, (e: ChangeEvent<HTMLInputElement>) => void, (e: any) => void, string]{
  const [ data, setData ] = useState(initialState);
  const [ submitErrors, setErrors ] = useState('');

  function validate (name: string, value: any){
    let error = '';
    if (data[name].isPasswordConfirmation) {
      if (data['password']) {
        error =
          data['password'].value === value
            ? ''
            : 'Password confirmation does not match!';

        console.log(data['password'].value, data[name].value);
      }
    } else {
      const validation = data[name].validation;
      error = validation ? validation(value) : '';
    }

    return error;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const error = validate(e.target.name, e.target.value);

    setData({
      ...data,
      [e.target.name]: {
        ...data[e.target.name],
        value: e.target.value,
        error
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let errors = Object.entries(data).reduce((acc, [ key, element ]) => {
      if (!element.validation) return acc;
      const error = validate(key, element.value);
      acc += error ? error + ', ' : '';
      return acc;
    }, '');

    errors = errors ? errors.slice(0, errors.length - 2) : '';

    if (errors) {
      setErrors(errors);
      return;
    }

    successSubmit();
  };

  return [ data, handleChange, handleSubmit, submitErrors ];
}
