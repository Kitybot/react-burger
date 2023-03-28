import { useEffect, useMemo } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import { useDispatch, useSelector } from '../utils/hooks';
import styles from './order-Feed.module.css';
import OrderInShort from '../components/order-In-Short/order-In-Short';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../images/Loader.gif';
import {  socketStartFeedActionCreator, breakWsConnectionActionCreator } from '../services/actions/socket-Middleware';

type TLists = {
  pendingOrders: JSX.Element[];
  doneOrders: JSX.Element[];
};
type TSmallLists = {
  pendingOrders: {numbers: JSX.Element[], uuid: string}[];
  doneOrders: {numbers: JSX.Element[], uuid: string}[];
};

function OrderFeed() {
  const dispatch = useDispatch();
  const { allOrders, totalOrders, totalTodayOrders, ingredients } = useSelector(state => {
    const allOrders = state.orders.allOrders;
    return {
    allOrders: 'orders' in allOrders && allOrders.orders,
    totalOrders: 'total' in allOrders && allOrders.total,
    totalTodayOrders: 'totalToday' in allOrders && allOrders.totalToday,
    ingredients: state.burgerIngredients,
  }});
  useEffect(() => {
    dispatch(changeActivePageActionCreator('orders'));
    if (ingredients) {
      dispatch(socketStartFeedActionCreator());
    }
    return () => {
      dispatch(breakWsConnectionActionCreator());
    }
  }, [dispatch, ingredients]);

  const currentDate = new Date(new Date().toDateString());
  const ordersArray = useMemo(() => {
    return allOrders && allOrders.map((item) => {
      const { number, createdAt, name, ingredients, _id } = item;
      return (
        <OrderInShort numberOrder={number} 
                      orderTime={createdAt} 
                      burgerName={name}
                      idIngredients={ingredients}
                      currentDate={currentDate}
                      key={_id}
                      orders={allOrders}
                      />
      );
    });
  }, [allOrders]);

  const {pendingOrders, doneOrders} = useMemo<TSmallLists>(() => {
    const lists: false | TLists = allOrders && 
      allOrders.reduce((previousValue: TLists, item) => {
      if (item.status === 'done') {
        previousValue.doneOrders.push(<li className='text text_type_digits-default mb-2 mr-2' 
                                          key={item._id}>
                                            {item.number}
                                      </li>);
      } else if (item.status === 'pending') {
        previousValue.pendingOrders.push( <li className='text text_type_digits-default mb-2' 
                                              key={item._id}>
                                                {item.number}
                                          </li>);
      }
      return previousValue;
    }, {pendingOrders: [], doneOrders: []});
    const smallLists: TSmallLists = {doneOrders: [], pendingOrders: []}
    function splitList (list: JSX.Element[]) {
      return list.reduce((previousValue: {numbers: JSX.Element[], uuid: string}[], 
                          item, 
                          index) => {
        if ( index % 10 === 0) {
          previousValue.push({numbers: [], uuid: uuidv4()});
        }
        previousValue[Math.floor(index / 10)].numbers.push(item);
        return previousValue;
      }, []);
    }
    if (allOrders && lists && lists.doneOrders.length > 0) {
      smallLists.doneOrders = splitList(lists.doneOrders);
    }
    if (allOrders && lists && lists.pendingOrders.length > 0) {
      smallLists.pendingOrders = splitList(lists.pendingOrders);
    }
    return allOrders ?  smallLists : {pendingOrders: [], doneOrders: []};
  }, [allOrders]);

  return (!allOrders && !ingredients) ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 ${styles.heading}`}>Лента заказов</h1>
      <section className={`pr-2 ${styles.orders}`}>
        {ordersArray}
      </section>
      <section className={styles.stats}>
        <div className={styles.done}>
          <p className={`text text_type_main-medium mb-6 ${styles.name}`}>Готовы:</p>
          <div className={styles.listsContainer}>
            {doneOrders.map((item) => (
              <ul className={`${styles.list} ${styles.listDone}`} key={item.uuid}>
                {item.numbers}
              </ul>
            ))}
          </div>
        </div>
        <div className={styles.pending}>
          <p className={`text text_type_main-medium mb-6 ${styles.name}`}>В работе:</p>
          <div className={styles.listsContainer}>
            {pendingOrders.map((item) => (
              <ul className={styles.list} key={item.uuid}>
                {item.numbers}
              </ul>
            ))}
          </div>
        </div>
        <div className={styles.total}>
          <p className={`text text_type_main-medium ${styles.name}`}>
            Выполнено за все время:
          </p>
          <p className='text text_type_digits-large'>
            {allOrders && totalOrders.toLocaleString()}
          </p>
        </div>
        <div className={styles.totalToday}>
          <p className={`text text_type_main-medium ${styles.name}`}>
            Выполнено за сегодня:
          </p>
          <p className='text text_type_digits-large'>
            {allOrders && totalTodayOrders.toLocaleString()}
          </p>
        </div>
      </section>
    </main>
  );
}

export default OrderFeed;