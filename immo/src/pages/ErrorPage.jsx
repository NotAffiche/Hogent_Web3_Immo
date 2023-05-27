import React from 'react';

const ErrorPage = () => {
  let title = 'Error';
  let message = 'Something went wrong... o.O \n';
  
  return (
    <>
    <h1>{title}</h1>
    <p>{message}</p>
    </>
  );
};

export default ErrorPage;
