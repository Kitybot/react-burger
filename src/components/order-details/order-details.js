import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './order-details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder } from '../../services/actions/order-detalis';
import { getAccessTokenOutCookie } from '../../utils/utils';
import { requestWithAccessToken, getUser } from '../../services/actions/user';
import PropTypes from 'prop-types';

function OrderDetails({closeModalWithDispatch}) {

  const { constructorIngredients,
          orderDetails,
          userName,
          userEmail }= useSelector( state => ({
            constructorIngredients: state.burgerConstructor,
            orderDetails: state.orderDetails,
            userName: state.user.userName, 
            userEmail: state.user.email,
          }));
  const dispatch = useDispatch();
  const history = useHistory();
  const [request, setRequest] = useState({
                                            isActive: true,
                                            message: ''
                                          });

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (userName === '' || userEmail === '') {
        setRequest({isActive: true, message: 'Запрашиваем информацию о пользователе...'});
        const accessToken = getAccessTokenOutCookie();
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
          new Promise ((resolve, reject) => {
            requestWithAccessToken( dispatch, 
                                    getUser, 
                                    accessToken, 
                                    refreshToken, 
                                    {resolve, reject})
          })
          .then(() => {
            resolve();
          })
          .catch(() => {
            closeModalWithDispatch(true);
            history.replace({
              pathname: '/login',
              state: {from: '/'}
            });
            reject();
          });
        } else {
          closeModalWithDispatch(true);
          history.replace({
            pathname: '/login',
            state: {from: '/'}
          });
          reject();
        }
      } else {
        resolve();
      }
    })
    .then(() => {
      const accessToken = getAccessTokenOutCookie();
      dispatch(sendOrder(setRequest, constructorIngredients, accessToken));
    })
    .catch(() => {})
  }, [dispatch, constructorIngredients]);

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

OrderDetails.propTypes = {
  closeModalWithDispatch: PropTypes.func,
}

export default OrderDetails;
