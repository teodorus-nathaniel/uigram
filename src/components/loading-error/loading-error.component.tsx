import React, { Fragment } from 'react';
import Loading from '../loading/loading.component';
import ErrorMessage from '../error-message/error-message.component';

interface IProps {
  isLoading?: boolean;
  loadingSize?: number;
  error?: Error | null;
  children: any;
}

export default function LoadingError ({
  children,
  isLoading,
  error,
  loadingSize
}: IProps){
  return (
    <Fragment>
      {isLoading ? (
        <Loading size={loadingSize} />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        children
      )}
    </Fragment>
  );
}
