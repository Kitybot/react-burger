import { baseUrl, checkResponse } from '../../utils/utils';
import { openModalActionCreator } from './app';
import { v4 as uuidv4 } from 'uuid';

export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';

const updateIngredientsActionCreator = (data) => {
  return function(dispatch) {
    data.forEach(ingredient => {
      ingredient.uuid = uuidv4();
    });
    dispatch({
      type: UPDATE_INGREDIENTS,
      ingredients: data
    });
  }
};

export function getIngredients() {
  return function (dispatch) {
    fetch(`${baseUrl}ingredients`)
    .then(checkResponse)
    .then( data => {
      dispatch(updateIngredientsActionCreator(data.data));
    })
    .catch((err) => {
      const message = `Произошла ошибка.${err} Перезагрузите страницу.`;
      dispatch(openModalActionCreator('error', message));
    });
  }
}