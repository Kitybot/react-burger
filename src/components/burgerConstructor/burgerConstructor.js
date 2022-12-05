import React from "react";
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import data from "../../utils/types";
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor({order}) {

  const bun = data.find(item => {
    return item._id === order.bun;
  });
  const bunPrice = bun === undefined ? 0 : bun.price;
  
  const othersIngredients = order.others.map((item) => {
    return data.find( meal => {
      return meal._id === item;
    });
  });

  const price = bunPrice * 2 + othersIngredients.reduce(function(previousValue, item) {
    return previousValue + item.price;
  }, 0);

  return (
    <section className={`pl-4 pt-25 pb-3 ${styles.order}`}>
      <ul className={styles.orderStructure}>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
        <ul className={`${othersIngredients.length !== 0 && "mt-4 mb-4 pr-4"} ${styles.othersIngredients}`}>
          {othersIngredients.map((item, index) => {
            return (<li className={`pl-4 ${styles.otherIngredient}`} key={index}>
                      <DragIcon type="primary" />
                      <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
                    </li>)
          })}
        </ul>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
      </ul>
      <div className={`mt-10 mb-10 ${styles.finishOrder} pr-4`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className="text text_type_digits-medium mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  })
}