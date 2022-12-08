import React from "react";
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from '../../utils/types';

let todoCounter = 0;
function getNewTodo() {
  todoCounter += 1;
}

function BurgerConstructor({bunOrder, othersOrder, ingredients, openModal}) {
  
  const openModalOrderDetails = () => {
    openModal('orderDetails');
  }

  const bun = ingredients.find(item => {
    return item._id === bunOrder;
  });

  const bunPrice = bun === undefined ? 0 : bun.price;
  
  const othersIngredients = othersOrder.map((item) => {
    return ingredients.find( meal => {
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
            getNewTodo();
            return (<li className={`pl-4 ${styles.otherIngredient}`} key={todoCounter}>
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
        <Button htmlType = "button" type="primary" size="large" onClick={openModalOrderDetails}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  bunOrder: PropTypes.string.isRequired,
  othersOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(ingredientType),
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;