import React from 'react';
import NavigationComponent from '../components/NavigationComponent';
//import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  //const error = useRouteError();
  let title = 'Error';
  let message = 'Something went wrong... o.O \n';// + error.toString();

  return (
    <>
    <h1>{title}</h1>
    <p>{message}</p>
    </>
  );
};

export default ErrorPage;
