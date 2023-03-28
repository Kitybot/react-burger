import OrderInfo from "../components/order-Info/order-Info";
import { useSelector, useDispatch } from '../utils/hooks';
import styles from './feed-Order-Info.module.css';
import { useEffect } from 'react';
import Loader from '../images/Loader.gif';
import {  socketStartFeedActionCreator, closeWsConnectionActionCreator } from '../services/actions/socket-Middleware';
import { changeActivePageActionCreator } from '../services/actions/app';

function FeedOrderInfo() {
  const { allOrders, burgerIngredients } = useSelector(state => ({
    allOrders: 'orders'in state.orders.allOrders && state.orders.allOrders.orders,
    burgerIngredients: state.burgerIngredients
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePageActionCreator('orders'));
  }, [dispatch, burgerIngredients]);

  useEffect(() => {
    if (!allOrders && burgerIngredients) {
      dispatch(socketStartFeedActionCreator())
    }
    return () => {
      if (allOrders) {
        dispatch(closeWsConnectionActionCreator());
      };
    }
  }, [dispatch, burgerIngredients, allOrders]);

  return (allOrders && burgerIngredients) ? (
    <main className={styles.main}>
      <OrderInfo orders={allOrders}/>
    </main>
  ) : (<img src={Loader} alt='Загружаем данные...'/>)
}

export default FeedOrderInfo;