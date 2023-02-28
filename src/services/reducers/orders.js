import { SAVE_ALL_ORDERS, ERASE_USER_ORDERS } from '../actions/orders';

const initialState = {
  allOrders: {},
  userOrders: [],
}

export const ordersReducer = (state = initialState, action) => {
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