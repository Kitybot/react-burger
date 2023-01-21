import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_OTHER_INGREDIENT, MOVING_INGREDIENT, addIngredientActionCreator } from '../../services/actions/burger-constructor';
import { COUNT_PRICE_BURGER } from '../../services/actions/order-detalis';
import { openModalActionCreator } from '../../services/actions/app';
import { useDrop } from "react-dnd";
import OtherIngredientConstructor from '../other-ingredient-constructor/other-ingredient-constructor';

function BurgerConstructor() {

  
  const {ingredients, burgerPrice, bunId, othersId} = useSelector(state => ({
    ingredients: state.burgerIngredients,
    burgerPrice: state.orderDetails.price,
    bunId: state.burgerConstructor.bun,
    othersId: state.burgerConstructor.others,
  }));
  const dispatch = useDispatch();

  
  const [{canAcceptIngredient}, ingredientDropTargetRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (!bunId && item._type !== 'bun') {
        dispatch(openModalActionCreator('error','Пожалуйста, выберите сначала булку.'));
      } else {
        dispatch(addIngredientActionCreator(item)
        );
      }
    },
    collect: (monitor) => ({
        canAcceptIngredient: monitor.canDrop(),
      })
  }, [bunId]);

  const openModalOrderDetails = () => {
    if (!bunId) {
      const message = `В Вашем заказе нет ни одного ингредиента. 
        Составте, пожалуйста, бургер и мы с радостью примем Ваш заказ.`;
      dispatch(openModalActionCreator('error', message));
      return
    }
    if (!othersId.length) {
      const message = `Ну какой же это бургер, если в нем только булки. 
        Добавте другие ингредиенты.`;
      dispatch(openModalActionCreator('error', message));
      return
    }
    dispatch(openModalActionCreator('orderDetails'));
  }

  const bun = React.useMemo( () => {
    return ingredients.find(item => {
      return item._id === bunId;
    });
  },[bunId, ingredients]);
  const othersIngredients = React.useMemo( () => {
    return othersId.map((item) => {
      const ingredient = {...ingredients.find( meal => {
        return meal._id === item.id;
      })};
      ingredient.uuid = item.uuid;
      return ingredient;
    });
  }, [othersId, ingredients]);


  useEffect(() => {
    const bunPrice = bun === undefined ? 0 : bun.price;
    const burgerPrice = bunPrice * 2 + othersIngredients.reduce( 
      (previousValue, item) => {
        return previousValue + item.price;
      }, 0);
    dispatch({
      type: COUNT_PRICE_BURGER,
      price: burgerPrice,
    })
  }, [bun, othersIngredients, dispatch]);

  const removeIngredient = (e) => {
    dispatch({
      type: DELETE_OTHER_INGREDIENT,
      index: e.target.closest('li').getAttribute('index'),
    });
  };

  const moveIngredient = (indexOfMoved, indexOfRecipient) => {
    dispatch({
      type: MOVING_INGREDIENT,
      indexOfMoved,
      indexOfRecipient,
    })
  };

  return (
    <section className={`pl-4 pt-25 pb-3 ${styles.order}`}>
      <ul className={`${styles.orderStructure} ${canAcceptIngredient && styles.canAccept}`} 
        ref={ingredientDropTargetRef}>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="top" isLocked={true} text={`${bun.name} 
          (верх)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
        <ul className={`${othersIngredients.length !== 0 && "mt-4 mb-4 pr-4"} 
        ${styles.othersIngredients}`}>
          {othersIngredients.map((item, index) => {
            return (<OtherIngredientConstructor item={item} index={index} 
              removeIngredient={removeIngredient} moveIngredient={moveIngredient} 
              key={item.uuid}/>)
          })}
        </ul>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="bottom" isLocked={true} text={`${bun.name} 
          (низ)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
      </ul>
      <div className={`mt-10 mb-10 ${styles.finishOrder} pr-4`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className="text text_type_digits-medium mr-2">{burgerPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModalOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;