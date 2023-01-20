import React from "react";
import { PropsWithChildren } from "react";
import PropTypes from 'prop-types';

function ErrorMessage({message}) {
  return(
      <h2 className='text text_type_main-large'>{message}</h2>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string
}

export default ErrorMessage;