import React, { useContext, useEffect } from "react";
import styles from './burger-Constructor.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';
import {IngredientsContext, OrderContext} from '../../services/appContext';

let todoCounter = 0;
function getNewTodo() {
  todoCounter += 1;
}

function BurgerConstructor({openModal}) {

  const ingredients = useContext(IngredientsContext);

  const [stateOrder, dispatchOrder] = useContext(OrderContext);

  const openModalOrderDetails = () => {
    openModal('orderDetails');
  }

  const bun = React.useMemo( () => {
    return ingredients.find(item => {
      return item._id === stateOrder.bun;
    });
  },[stateOrder.bun]);

 
  const othersIngredients = React.useMemo( () => {
    return stateOrder.others.map((item) => {
      return ingredients.find( meal => {
        return meal._id === item;
      });
    });

  }, [stateOrder.others]);

  useEffect(() => {
      dispatchOrder({
      type: "countPrice",
      bun,
      othersIngredients
    })
  }, [bun, othersIngredients])

  return (
    <section className={`pl-4 pt-25 pb-3 ${styles.order}`}>
      <ul className={styles.orderStructure}>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="top" isLocked={true} text={`${bun.name} 
          (верх)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
        <ul className={`${othersIngredients.length !== 0 && "mt-4 mb-4 pr-4"} 
        ${styles.othersIngredients}`}>
          {othersIngredients.map((item) => {
            getNewTodo();
            return (<li className={`pl-4 ${styles.otherIngredient}`} key={todoCounter}>
                      <DragIcon type="primary" />
                      <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
                      <ConstructorElement text={item.name} thumbnail={item.image} 
                      price={item.price}/>
                    </li>)
          })}
        </ul>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="bottom" isLocked={true} text={`${bun.name} 
          (низ)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
      </ul>
      <div className={`mt-10 mb-10 ${styles.finishOrder} pr-4`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className="text text_type_digits-medium mr-2">{stateOrder.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModalOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;