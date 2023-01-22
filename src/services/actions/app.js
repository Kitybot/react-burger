import { deleteIngrdientDetails } from './ingredient-detalis';
import { resetConstructorActionCreator } from './burger-constructor';
import { fetchUsersStarted } from './ingredient-detalis'
import { fetchUsersSuccess } from './ingredient-detalis'
import { fetchUsersFailure } from './ingredient-detalis'
import { fetchStarted } from './order-detalis'
import { fetchSuccess } from './order-detalis'
import { fetchFailure } from './order-detalis'

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModalActionCreator(typeModal, message = '') {
  return {
    type: OPEN_MODAL,
    isModalActive: typeModal,
    message,
  }
}

export function closeModal(isModalActive) {
  return function(dispatch) {
    dispatch({
      type: CLOSE_MODAL,
    });
    switch (isModalActive){
      case 'ingredientDetails':
        dispatch(deleteIngrdientDetails());
        break;
      case 'orderDetails':
        dispatch(resetConstructorActionCreator());
        break;
      default:
        return;
    }
  }
};
