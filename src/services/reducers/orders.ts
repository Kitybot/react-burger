import { SAVE_ALL_ORDERS, ERASE_USER_ORDERS } from '../actions/orders';
import { TOrder } from '../../utils/types';
import { TAllActions } from '../actions/unionIfActions';

export interface IAllOrders {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}
interface IOrdersState {
  allOrders: {} | IAllOrders;
  userOrders: [] | Array<TOrder>;
}
const initialState: IOrdersState = {
  allOrders: {},
  userOrders: [],
}

export const ordersReducer = (state = initialState, action: TAllActions): IOrdersState => {
  switch (action.type) {
    case SAVE_ALL_ORDERS:
      return {...state, 
              [action.fieldName]: action.fieldName === 'allOrders' ? 
                                    action.data : 
                                    action.data.orders};
    case ERASE_USER_ORDERS:
      return {...state, userOrders: []};
    default:
      return state;
  }
}