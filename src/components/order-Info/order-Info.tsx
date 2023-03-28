import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import styles from './order-Info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { timeString, countingPrice, getOrderStatus } from '../../utils/utils';
import Loader from '../../images/Loader.gif';
import { TOrder } from '../../utils/types';
import { FC } from 'react';

interface IOrderInfo {
  orders: TOrder[];
  modal?: boolean;
}

const OrderInfo: FC<IOrderInfo> = ({ orders, modal }) => {
  const burgerIngredients = useSelector(state => state.burgerIngredients);
  const orderUseParams: {id: string} = useParams();
  const id = parseInt(orderUseParams.id, 10);

  type TInfoOutOrder = {
    number?: number;
    name?: string;
    status?: string;
    ingredients?: Array<string>;
    createdAt?: string;
  };
  const { number, name, status, ingredients, createdAt }: TInfoOutOrder = {...useMemo(() => {
    const value = orders.find((item) => {
        return id === item.number
    });
    return value;
  }, [orders, id])};


  const listIngredients = useMemo (() => {
    const value = ingredients && ingredients.reduce((
      previousValue: {id: string, volume: number}[],
      item
    ) => {
      if (previousValue.length === 0) {
        previousValue.push({id: item, volume: 1});
      } else {
        const index = previousValue.findIndex((i) => {
          return i.id === item
        })
        if (index < 0) {
          previousValue.push({id: item, volume: 1});
        } else {
          previousValue[index].volume += 1;
        }
      }
      return previousValue
    }, []);
    return value;
  }, [ingredients]);

  const { liste, burgerPrice }: {burgerPrice?: number, liste?: JSX.Element[]} = 
    {...useMemo(() => {
    const value = burgerIngredients ? listIngredients && listIngredients.reduce(
        (previousValue: {burgerPrice: number, liste: JSX.Element[]}, item) => {
      const ingredientInfo = burgerIngredients.find(i => {
        return i._id === item.id;
      });
      if (ingredientInfo && ingredientInfo.type === 'bun') {
        item.volume = 2;
      }
      if (ingredientInfo) {
        countingPrice(ingredientInfo.type, ingredientInfo.price, previousValue);
        previousValue.liste.push(
          <li key={ingredientInfo.uuid} className={`mb-4 ${styles.ingredient}`}>
            <div className={styles.container}>
              <img src={ingredientInfo.image} 
                   alt={ingredientInfo.name} 
                   className={styles.image}/>
              <p className='ml-4 text text_type_main-default'>{ingredientInfo.name}</p>
            </div>
            <div className={`mr-6 ${styles.container}`}>
              <span className={`text text_type_digits-default mr-2 ${styles.ingredientPrice}`}>
                {`${item.volume} x ${ingredientInfo.price}`}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        )
      };
      return previousValue;
    }, {burgerPrice: 0, liste: []}) : {burgerPrice: 0, liste: []};
    return value;
  }, [listIngredients, burgerIngredients])};

  const time = createdAt && timeString(createdAt, new Date(new Date().toDateString()));

  const orderStatus = getOrderStatus(status);

  const location = useLocation();
  window.history.replaceState(null, '', location.pathname);

  return !burgerIngredients ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <>
      <span className={`text text_type_digits-default mb-10 ${!modal && styles.number}`}>
        {`#${number}`}
      </span>
      <h1 className={`text text_type_main-medium mb-3 ${styles.name}`}>{name}</h1>
      <span className={`text text_type_main-default ${styles.status}
                        ${status === 'done' && styles.doneColor}
                        ${status === 'cancell' && styles.cancellColor}`}>
        {orderStatus}
      </span>
      <span className='text text_type_main-medium mb-6'>Состав:</span>
      <ul className={`mb-10 ${styles.list}`}>{liste}</ul>
      <div className={styles.timePrice}>
        <p className='text text_type_main-default text_color_inactive'>{time}</p>
        <div className={styles.price}>
          <span className='text text_type_digits-default mr-2'>{burgerPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
}


export default OrderInfo;