import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './order-details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder } from '../../services/actions/order-detalis';

function OrderDetails() {

  const { constructorIngredients,
          orderDetails } = useSelector( state => ({
            constructorIngredients: state.burgerConstructor,
            orderDetails: state.orderDetails,
          }))
  const dispatch = useDispatch();
  const [request, setRequest] = useState({
                                            isActive: true,
                                            message: ''
                                          });

  useEffect(() => {
    dispatch(sendOrder(setRequest, constructorIngredients))
  }, [dispatch, constructorIngredients])

  return(
    request.isActive ?
      (
        <>
          <p className="text text_type_main-medium mt-8">{request.message}</p>
        </>
      ) :
      (<>
        <h2 className="text text_type_digits-large mt-20">{orderDetails.number}</h2>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <div className={`mt-15 ${styles.iconContainer}`}>
          <CheckMarkIcon type='primary'/>
        </div>
        <p className='text text_type_main-default mt-15'>{orderDetails.execution}</p>
        <p className='text text_type_main-default text_color_inactive mt-2 mb-15'>
          Дождитесь готовности на орбитальной станции
        </p>
      </>)
    
  )
}

export default OrderDetails;
