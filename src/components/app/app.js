import React, { useState, useEffect, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { baseUrl, checkResponse } from '../../utils/utils';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-detalis/ingredient-detalis';
import ErrorMessage from '../error-massege/error-massege';
import {IngredientsContext, OrderContext} from '../../services/appContext';


const App = () => {
  
  const [activePage, setActivePage] = useState('constructor');
  const [ingredients, setIngredients] = useState(null);
  const [isModalActive, setIsModalActive] = useState({
                                                        isModalActive: '',
                                                        shownIngredient: {},
                                                        errorMessage: ''
                                                      });

  const closeModal = () => {
    setIsModalActive({
                      isModalActive: '',
                      shownIngredient: {},
                      errorMessage: ''
                      });
  }

  const openModal = (modalWindow, shownIngredient = {}) => {
    setIsModalActive({
                      ...isModalActive,
                      isModalActive: modalWindow,
                      shownIngredient
                      });
  }

  const initialOrder = {
                          number: '',
                          execution: '',
                          bun: '',
                          others:[],
                          price: 0
                        };
  const initOrder = (initialOrder) => {return {
                                                ...initialOrder,
                                                execution: 'Ваш заказ начали готовить',
                                                bun: "60d3b41abdacab0026a733c6",
                                                others: ["60d3b41abdacab0026a733ce", 
                                                         "60d3b41abdacab0026a733c9",
                                                         "60d3b41abdacab0026a733d1",
                                                         "60d3b41abdacab0026a733d0",
                                                         "60d3b41abdacab0026a733d0"
                                                       ]
                                              }};
  const reducerOrder = (stateOrder, actionOrder) => {
    function countPrice({bun, othersIngredients}) {
      const bunPrice = bun === undefined ? 0 : bun.price;
      return bunPrice * 2 + othersIngredients.reduce( (previousValue, item) => {
          return previousValue + item.price;
        }, 0);
    }
    switch (actionOrder.type) {
      case "countPrice":
        return {
                 ...stateOrder,
                 price: countPrice(actionOrder)
               };
      case 'saveNumberOrder':
        return {
                 ...stateOrder,
                 number: actionOrder.number
               };
      default:
    }
  };
  const [stateOrder, dispatchOrder] = useReducer(reducerOrder, initialOrder, initOrder);
  
  useEffect( () => {
    const getIngredients = () => {
      fetch(`${baseUrl}ingredients`)
        .then(checkResponse)
        .then( data => {
          setIngredients(data.data);
        })
        .catch((err) => {
          setIsModalActive({
            ...isModalActive,
            isModalActive: 'error',
            errorMessage: `Произошла ошибка.${err} Перезагрузите страницу.`
          })
        });};
    getIngredients();
  } , []);

  return (
    <div className={styles.app}>
      <AppHeader activePage={activePage}/>
      <OrderContext.Provider value={[stateOrder, dispatchOrder]}>
        <main className={styles.main}>
          <IngredientsContext.Provider value={ingredients}>
            <BurgerIngredients openModal={openModal}/>
            {ingredients && (<BurgerConstructor openModal={openModal}/>)}
          </IngredientsContext.Provider>
        </main>
        {isModalActive.isModalActive !== '' && (
          <Modal closeModal={closeModal} activeModal={isModalActive.isModalActive}>
            {isModalActive.isModalActive === 'orderDetails' && (
              <OrderDetails/>
            )}
            {isModalActive.isModalActive === 'ingredientDetails' && (<IngredientDetails 
            ingerdient={isModalActive.shownIngredient}/>)}
            {isModalActive.isModalActive === 'error' && (<ErrorMessage 
            errorMessage={isModalActive.errorMessage}/>)}
          </Modal>
        )}
      </OrderContext.Provider>
    </div>
  );
}

export default App;