import React from 'react';
import './card-form.styles.scss';
import Button from '../button/button.component';
import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  children: JSX.Element | JSX.Element[] | null;
  actionButtonText: string;
  additional: {
    main: string;
    sub: string;
    img: string;
    actionText: string;
    link: {
      text: string;
      path: string;
    };
  };
  error?: string;
  onSubmit: (e: any) => void;
}

export default function CardForm ({
  title,
  children,
  additional,
  actionButtonText,
  error,
  onSubmit
}: IProps){
  return (
    <div className='card-form-wrapper'>
      <div className='card-form-card'>
        <div className='card-form'>
          <form className='card-form__form' onSubmit={onSubmit}>
            <h1>{title}</h1>
            <div className='card-form__form__fields'>{children}</div>
            <span className='error'>{error}</span>
            <div className='card-form__form__action'>
              <Button type='submit'>{actionButtonText}</Button>
              <span className='show-small'>
                {additional.actionText}{' '}
                <a
                  className='additional__action__link'
                  href={additional.link.path}>
                  {additional.link.text}
                </a>
              </span>
            </div>
          </form>
        </div>
        <div className='additional'>
          <div className='additional__text'>
            <p className='additional__text__main'>{additional.main}</p>
            <p className='additional__text__sub'>{additional.sub}</p>
          </div>
          <img src={additional.img} alt='sharing' />
          <span className='additional__action'>
            {additional.actionText}{' '}
            <Link
              className='additional__action__link'
              to={additional.link.path}>
              {additional.link.text}
            </Link>
          </span>
        </div>
      </div>
    </div>
    // <div className='card-form-wrapper'>
    //   <div className='card-form-card'>
    //     <div className='card-form'>
    //       <form className='card-form__form'>
    //         <h1>{Welcome back!}</h1>
    //         <div className='card-form__form__fields'>
    //           <InputField type='text' name='email' label='Email' />
    //           <InputField type='password' name='password' label='Password' />
    //         </div>
    //         <div className='card-form__form__action'>
    //           <Button type='submit'>Login</Button>
    //           <span className='show-small'>
    //             Already got an account?{' '}
    //             <span className='show-small__link'>Login</span>
    //           </span>
    //         </div>
    //       </form>
    //     </div>
    //     <div className='additional'>
    //       <div className='additional__text'>
    //         <p className='additional__text__main'>Share your design</p>
    //         <p className='additional__text__sub'>
    //           and discuss it with our community!
    //         </p>
    //       </div>
    //       <img src={SharingImage} alt='sharing' />
    //       <span className='additional__action'>
    //         Already got an account?{' '}
    //         <span className='additional__action__link'>Login</span>
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
}
