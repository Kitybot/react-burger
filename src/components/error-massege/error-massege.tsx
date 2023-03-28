import React from "react";

function ErrorMessage({message}: {message: string}) {
  return(
    <>
      <h2 className='text text_type_main-large'>{message}</h2>
    </>
  )
}

export default ErrorMessage;