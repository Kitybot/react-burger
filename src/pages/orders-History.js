import styles from './orders-History.module.css';
import OrderInShort from '../components/order-In-Short/order-In-Short';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import Loader from '../images/Loader.gif';
import  { socketStartHistoryActionCreator, 
          closeWsConnectionActionCreator } from '../services/actions/socket-Middleware';

function OrdersHistory() {
  const dispatch = useDispatch();
  const { userOrders, ingredients } = useSelector(state => ({
    userOrders: state.orders.userOrders,
    ingredients: state.burgerIngredients
  }));
  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
    if (ingredients) {
      dispatch(socketStartHistoryActionCreator())
    }
    return () => {
      dispatch(closeWsConnectionActionCreator());
    }
  }, [dispatch, ingredients]);

  const currentDate = new Date(new Date().toDateString());
  const cardsUserOrders = userOrders.map((item) => {
    const { number, createdAt, name, ingredients, status, _id } = item;
    return (
      <OrderInShort numberOrder={number} 
                    orderTime={createdAt} 
                    burgerName={name}
                    idIngredients={ingredients}
                    currentDate={currentDate}
                    status={status}
                    key={_id}
                    orders={userOrders}
                    />
    );
  });
  return !ingredients ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <div className={`mt-10 pt-1 pr-3 ${styles.container}`}>
      {cardsUserOrders}
    </div>
  )
}

export default OrdersHistory;