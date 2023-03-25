import { COUNT_PRICE_BURGER, SAVE_ORDER_DATA } from '../actions/order-detalis';
import { TAllActions } from '../actions/unionIfActions';

interface IOrderDetailsState {
  number: string;
  execution: string;
  price: number;
}
const initialState: IOrderDetailsState = {
  number: '',
  execution: '',
  price: 0
}

export const orderDetailsReducer = (state = initialState, action: TAllActions): 
IOrderDetailsState => {
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