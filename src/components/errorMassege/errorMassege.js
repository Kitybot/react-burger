import React from "react";
import { PropsWithChildren } from "react";
import PropTypes from 'prop-types';

function ErrorMessage({errorMessage}) {
  return(
    <>
      <h2 className='text text_type_main-large'>{errorMessage}</h2>
    </>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string
}

export default ErrorMessage;