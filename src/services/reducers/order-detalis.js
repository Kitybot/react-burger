import { COUNT_PRICE_BURGER, SAVE_ORDER_DATA } from '../actions/order-detalis';

const initialState = {
  number: '',
  execution: '',
  price: 0
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER_DATA:
      return {
        ...state,
        number: action.number,
        execution: action.execution,
      };
    case COUNT_PRICE_BURGER:
      return {
        ...state,
        price: action.price,
      };
    default:
      return state;
  }
};