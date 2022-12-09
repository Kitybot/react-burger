import React from 'react';
import styles from './order-Details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

function OrderDetails({numberOrder, orderExecution}) {
  return(
    <>
      <h2 className="text text_type_digits-large mt-20">{numberOrder}</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`mt-15 ${styles.iconContainer}`}>
        <CheckMarkIcon type='primary'/>
      </div>
      <p className='text text_type_main-default mt-15'>{orderExecution}</p>
      <p className='text text_type_main-default text_color_inactive mt-2 mb-15'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

OrderDetails.propTypes = {
  numberOrder: PropTypes.string,
  orderExecution: PropTypes.string
}

export default OrderDetails;