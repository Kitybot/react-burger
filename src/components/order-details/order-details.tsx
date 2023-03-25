import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import { useHistory } from 'react-router-dom';
import styles from './order-details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder } from '../../services/actions/order-detalis';
import { getAccessTokenOutCookie } from '../../utils/utils';
import { getUser, updateTokens } from '../../services/actions/user';
import { TAllActions } from '../../services/actions/unionIfActions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { TRootState } from '../../utils/types';

interface IOrderDetailsProps {
  closeModalWithDispatch: (saveBurger?: boolean) => 
    TAllActions | ThunkAction<void, Action<any>, TRootState, TAllActions>
}

function OrderDetails({closeModalWithDispatch}: IOrderDetailsProps) {

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
    new Promise<void>((resolve, reject) => {
      if (userName === '' || userEmail === '') {
        setRequest({isActive: true, message: 'Запрашиваем информацию о пользователе...'});
        const accessToken = getAccessTokenOutCookie();
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
          new Promise<void> ((resolve, reject) => {
            getUser(dispatch, accessToken)
            .then(() => resolve())
            .catch( () => {
              updateTokens(dispatch, refreshToken)
                .then((newAccessToken) => {
                  if (newAccessToken) {
                    getUser(dispatch, newAccessToken);
                  }
                  resolve();
                }
                )
                .catch(() => reject());
          })
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

export default OrderDetails;
