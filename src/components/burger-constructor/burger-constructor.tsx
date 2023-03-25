import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../utils/hooks";
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientActionCreator, movingIngredientActionCreator, deleteIngredientActionCreator } from '../../services/actions/burger-constructor';
import { countPriceBurgerActionCreator } from '../../services/actions/order-detalis';
import { openModalActionCreator } from '../../services/actions/app';
import { useDrop } from "react-dnd";
import OtherIngredientConstructor from '../other-ingredient-constructor/other-ingredient-constructor';
import { TIgredient, TOtherIgredient } from '../../utils/types';

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
    drop: (item: {_id: string, _type: string,}) => {
      if (!bunId && item._type !== 'bun') {
        if (!bunId) {
          const message = `В Вашем заказе нет ни одного ингредиента. 
            Составте, пожалуйста, бургер и мы с радостью примем Ваш заказ.`;
          dispatch(openModalActionCreator('error', message));
          return
        }
        dispatch(openModalActionCreator('error','Пожалуйста, выберите сначала булку.'));
      } else {
        dispatch(addIngredientActionCreator(item));
      }
    },
    collect: (monitor) => ({
        canAcceptIngredient: monitor.canDrop(),
      })
  }, [bunId]);

  const openModalOrderDetails = (): void => {
    if (!bunId) {
      const message: string = `В Вашем заказе нет ни одного ингредиента. 
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

  const bun = React.useMemo<TIgredient | undefined | null>( () => {
    return ingredients && ingredients.find(item => {
      return item._id === bunId;
    });
  },[bunId, ingredients]);
  const othersIngredients = React.useMemo<Array<TOtherIgredient | undefined | null>>( () => {
    return othersId.map((item) => {
      const ingredient = ingredients && {...ingredients.find( meal => {
        return meal._id === item.id;
      })};
      if (ingredient !== null) {
        ingredient.uuid = item.uuid;
      }
      return ingredient;
    });
  }, [othersId, ingredients]);


  useEffect(() => {
    const bunPrice = (bun === undefined || bun === null) ? 0 : bun.price;
    const burgerPrice = bunPrice * 2 + othersIngredients.reduce( 
      (previousValue, item) => {
        return previousValue + (item && item.price ? item.price : 0);
      }, 0);
    dispatch(countPriceBurgerActionCreator(burgerPrice));
  }, [bun, othersIngredients, dispatch]);

  const removeIngredient = (e?: React.MouseEvent<SVGAElement>): void => {
    const ingredientInConstructor = e && e.currentTarget.closest('li');
    const index = ingredientInConstructor && 
      Number(ingredientInConstructor.getAttribute('id'));
    if (index || index === 0) {
      dispatch(deleteIngredientActionCreator(index));
    }
  };

  const moveIngredient = (indexOfMoved: number, indexOfRecipient: number): void => {
    dispatch(movingIngredientActionCreator(indexOfMoved, indexOfRecipient))
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
            return item && (
              <OtherIngredientConstructor item={item} 
                                          index={index} 
                                          removeIngredient={removeIngredient} 
                                          moveIngredient={moveIngredient} 
                                          key={item && item.uuid}/>
              )
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