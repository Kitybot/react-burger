import OrderInfo from "../components/order-Info/order-Info";
import { useSelector, useDispatch } from 'react-redux';
import styles from './own-OrderInfo.module.css';
import { useEffect } from 'react';
import Loader from '../images/Loader.gif';
import {  socketStartHistoryActionCreator, closeWsConnectionActionCreator } from '../services/actions/socket-Middleware';
import { changeActivePageActionCreator } from '../services/actions/app';

function OwnOrderInfo() {
  const { userOrders, burgerIngredients } = useSelector(state => ({
    userOrders: state.orders.userOrders,
    burgerIngredients: state.burgerIngredients
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
  }, [dispatch, burgerIngredients]);

  useEffect(() => {
    if (!userOrders.length && burgerIngredients) {
      dispatch(socketStartHistoryActionCreator())
    }
    return () => {
      if (userOrders.length) {
        dispatch(closeWsConnectionActionCreator());
      };
    }
  }, [dispatch, burgerIngredients, userOrders]);

  return (userOrders.length && burgerIngredients) ? (
    <main className={styles.main}>
      <OrderInfo orders={userOrders}/>
    </main>
  ) : (<img src={Loader} alt='Загружаем данные...'/>)
}

export default OwnOrderInfo;