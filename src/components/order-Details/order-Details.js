import React, { useContext, useEffect, useState } from 'react';
import styles from './order-Details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import { OrderContext } from '../../services/appContext';
import { baseUrl, checkResponse } from '../../utils/utils';

function OrderDetails() {

  const [stateOrder, dispatchOrder] = useContext(OrderContext);

  const [request, setRequest] = useState({
                                            isActive: true,
                                            message: ''
                                          });

  useEffect(() => {
    function sendOrder() {
      setRequest({
                    ...request,
                    message: 'Отправляем заказ...'
                  });
      const listIngredients = [...stateOrder.others];
      listIngredients.unshift(stateOrder.bun);
      listIngredients.push(stateOrder.bun);
      fetch(`${baseUrl}orders`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "ingredients": listIngredients
          })
        })
        .then(checkResponse)
        .then((data) => {
          dispatchOrder({
                           type: 'saveNumberOrder',
                           number: String(data.order.number)
                         });
          setRequest({
                        isActive: false,
                        message: ''
                      })
        })
        .catch((err) => {
          setRequest({
                        ...request,
                        message: `Оправка заказа была неудачной.${err} Закройте окно
                                  и отправте заказ заново.`
                      });
        })
    };
    sendOrder();
  }, [])
  return(
    request.isActive ?
      (
        <>
          <p className="text text_type_main-medium mt-8">{request.message}</p>
        </>
      ) :
      (<>
        <h2 className="text text_type_digits-large mt-20">{stateOrder.number}</h2>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <div className={`mt-15 ${styles.iconContainer}`}>
          <CheckMarkIcon type='primary'/>
        </div>
        <p className='text text_type_main-default mt-15'>{stateOrder.execution}</p>
        <p className='text text_type_main-default text_color_inactive mt-2 mb-15'>
          Дождитесь готовности на орбитальной станции
        </p>
      </>)
  )
}


export default OrderDetails;