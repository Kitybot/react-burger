import { baseUrl, checkResponse } from '../../utils/utils';
import { closeModal, openModalActionCreator } from '../actions/app';

export const COUNT_PRICE_BURGER = 'COUNT_PRICE_BURGER';
export const SAVE_ORDER_DATA = 'SAVE_ORDER_DATA';
export const GET_ORDER_DETALIS__REQUEST = 'GET_ORDER_DETALIS__REQUEST';
export const GET_ORDER_DETALIS__SUCCESS = 'GET_ORDER_DETALIS__SUCCESS';
export const GET_ORDER_DETALIS__EROOR = 'GET_ORDER_DETALIS__EROOR';

export const fetchUsersStarted = () => {
  return {
      type: GET_ORDER_DETALIS__REQUEST,
  };
};

export const fetchUsersSuccess = users => {
  return {
      type: GET_ORDER_DETALIS__SUCCESS,
      payload: users,
  };
};

export const fetchUsersFailure = error => {
  return {
      type: GET_ORDER_DETALIS__EROOR,
      payload: error,
  };
};

export function sendOrder(setRequest, constructorIngredients) {
  return function(dispatch) {
    setRequest({
      isActive: true,
      message: 'Отправляем заказ...'
    });
    const listIngredients = constructorIngredients.others.map((item) => item.id);
    listIngredients.unshift(constructorIngredients.bun);
    listIngredients.push(constructorIngredients.bun);
    fetch(`${baseUrl}orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "ingredients": listIngredients
        })
      })
      .then(checkResponse)
      .then((data) => {
        dispatch({
                    type: SAVE_ORDER_DATA,
                    number: String(data.order.number),
                    execution: 'Ваш заказ начали готовить',
                  });
      })
      .catch((err) => {
        const message = `Оправка заказа была неудачной.${err} 
          Закройте окно и отправте заказ заново.`;
        closeModal();
        dispatch(openModalActionCreator('error', message));
      })
      .finally(() => {
        setRequest({
          isActive: false,
          message: ''
        })
      })
  }
}