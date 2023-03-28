import styles from './order-In-Short.module.css';
import { useSelector } from '../../utils/hooks';
import { useMemo, FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { timeString, countingPrice, getOrderStatus } from '../../utils/utils';
import { TOrder } from '../../utils/types';

interface IOrderInShort {
  status?: string;
  numberOrder: number;
  orderTime: string;
  burgerName: string;
  idIngredients: Array<string>;
  currentDate: Date;
  orders: TOrder[];
}

const OrderInShort: FC<IOrderInShort> = ({  status, 
                                            numberOrder, 
                                            orderTime, 
                                            burgerName, 
                                            idIngredients, 
                                            currentDate, 
                                            orders }) => {
  const ingredients = useSelector(state => state.burgerIngredients);
  const location = useLocation();

  const time = timeString(orderTime, currentDate);

  function makeIngredientIcon( index: number,
    image: string, 
    name: string, 
    uuid: string, 
    previousValue: {
     burgerPrice: number;
     burgerIngredients: JSX.Element[];
   }) {
    if (index <= 5) {
      const zIndex = idIngredients.length - index;
      const moreMaximum = index === 5 ? idIngredients.length - 6 : false;
      const imageIngredient = (
        <div key={`${uuid}-${index}`} 
             className={ `${styles.imageContainer} 
                          ${!!moreMaximum && styles.manyIngredients}`} 
             style={{zIndex: zIndex}}>
          <img src={image} 
               alt={name} 
               style={{zIndex: zIndex}}
               className={styles.image}/>
          { !!moreMaximum && 
            ( <span className={`text text_type_main-default ${styles.additionalIngredients}`}>
                {`+${String(moreMaximum)}`}
              </span>
            )
          }
        </div>
      )
      previousValue.burgerIngredients.push(imageIngredient);
    }
  }
  const {burgerPrice, burgerIngredients} = useMemo(() => {
    const iconsAndPrice = ingredients ? idIngredients.reduce((
      previousValue: {burgerPrice: number, burgerIngredients: JSX.Element[]}, 
      item, 
      index
    ) => {
      const ingredient = ingredients.find((i) => {
        return item === i._id
      })
      if (ingredient) {
        countingPrice(ingredient.type, ingredient.price, previousValue);
        makeIngredientIcon( index, 
                            ingredient.image, 
                            ingredient.name,
                            ingredient.uuid,
                            previousValue);
      }
      return previousValue;
    }, {burgerPrice: 0, burgerIngredients: []}) : {burgerPrice: 0, burgerIngredients: []};
    return iconsAndPrice;
  } , [ingredients, idIngredients]);
  const orderStatus = getOrderStatus(status);

  const { path } = useRouteMatch();

  return (
    <Link to={{
                pathname: `${path}/${numberOrder}`,
                state: {
                          background: location,
                          orders
                        }
              }} 
          className={`mb-4 ${styles.link}`}>
      <div className={`pt-6 pr-6 pb-6 pl-6 ${styles.container}`}>
        <span className={`text text_type_digits-default ${styles.numberOrder}`}>
          {`#${String(numberOrder)}`}
        </span>
        <span className={`text text_type_main-default text_color_inactive ${styles.orderTime}`}>
          {time}
        </span>
        <div className={styles.nameAndStatus}>
          <span className={`text text_type_main-medium ${styles.burgerName}`}>
            {burgerName}
          </span>
          {!!status && (
                        <span className={`text text_type_main-default mt-2 
                                          ${status === 'done' && styles.doneColor} 
                                          ${status === 'cancell' && styles.cancellColor}`}>
                          {orderStatus}
                        </span>
                       )
          }
        </div>
        <div className={styles.ingredientsCotnainer}>
          {burgerIngredients}
        </div>
        {ingredients && (<div className={`pl-5 ${styles.priceContainer}`} 
          style={{zIndex: idIngredients.length}}>
          <span className='text text_type_digits-default mr-2'>{burgerPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>)}
      </div>
    </Link>
  )
}

export default OrderInShort;