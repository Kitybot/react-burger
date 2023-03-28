import { deleteIngrdientDetails } from './ingredient-detalis';
import { resetConstructorActionCreator } from './burger-constructor';
import { TAppThunk, TAppDispatch } from '../../utils/types';

export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';
export const CHANGE_ACTIVE_PAGE: 'CHANGE_ACTIVE_PAGE' = 'CHANGE_ACTIVE_PAGE';

export interface IChangeActivePageAction {
  readonly type: 'CHANGE_ACTIVE_PAGE';
  readonly activePage: string;
}
export function changeActivePageActionCreator(page: string): IChangeActivePageAction {
  return {
    type: CHANGE_ACTIVE_PAGE,
    activePage: page
  }
}

export interface IOpenModalAction {
  readonly type: 'OPEN_MODAL';
  readonly isModalActive: string;
  readonly message: string;
}
export function openModalActionCreator(typeModal: string, message: string = ''): 
  IOpenModalAction {
  return {
    type: OPEN_MODAL,
    isModalActive: typeModal,
    message,
  }
}

export interface ICloseModalAction {
  readonly type: 'CLOSE_MODAL';
}
function closeModalActionCreator(): ICloseModalAction {
  return {
    type: CLOSE_MODAL,
  }
}

export const closeModal: TAppThunk = (isModalActive: string, saveBurger?: boolean) => {
  return function(dispatch: TAppDispatch) {
    dispatch(closeModalActionCreator());
    switch (isModalActive){
      case 'ingredientDetails':
        dispatch(deleteIngrdientDetails());
        break;
      case 'orderDetails':
        if (!saveBurger) {
          dispatch(resetConstructorActionCreator());
        }
        break;
      default:
        return;
    }
  }
};
