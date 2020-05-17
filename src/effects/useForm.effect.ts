import { useState, ChangeEvent } from 'react';

export default function useForm<
  T extends {
    [key: string]: {
      validation?: (value: any) => string;
      value: any;
      error?: string;
      sameAs?: string;
      link?: string;
    };
  }
> (
  initialState: T,
  successSubmit: () => void
): [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: any) => void,
  string,
  React.Dispatch<React.SetStateAction<T>>
]{
  const [ data, setData ] = useState(initialState);
  const [ submitErrors, setErrors ] = useState<string[]>([]);

  function validate (name: string, value: any, newLinkData?: string){
    let error = '';
    const sameAsAttr = data[name].sameAs;
    if (sameAsAttr) {
      if (data[sameAsAttr]) {
        let isSame = data[sameAsAttr].value === value;
        if (newLinkData) {
          isSame = newLinkData === value;
        }
        error = isSame
          ? ''
          : `${sameAsAttr.charAt(0).toUpperCase() +
              sameAsAttr.substr(1)} confirmation does not match!`;
      }
    } else {
      const validation = data[name].validation;
      error = validation ? validation(value) : '';
    }

    return error;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validate(name, value);

    const link = data[name].link;
    let linkError = '';
    if (link && data[link]) {
      linkError = validate(link, data[link].value, value);

      setData({
        ...data,
        [name]: {
          ...data[name],
          value: value,
          error
        },
        [link]: {
          ...data[link],
          error: linkError
        }
      });
    } else {
      setData({
        ...data,
        [name]: {
          ...data[name],
          value: value,
          error
        }
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let errors = Object.entries(data).reduce<
      string[]
    >((acc, [ key, element ]) => {
      if (!element.validation) return acc;
      const error = validate(key, element.value);
      if (error) acc.push(error);
      return acc;
    }, []);

    setErrors(errors);

    if (errors.length !== 0) return;

    successSubmit();
  };

  return [ data, handleChange, handleSubmit, submitErrors[0], setData ];
}
