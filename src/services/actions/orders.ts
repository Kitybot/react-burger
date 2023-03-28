import { IAllOrders } from '../reducers/orders';

export const SAVE_ALL_ORDERS: 'SAVE_ALL_ORDERS' = 'SAVE_ALL_ORDERS';
export const ERASE_USER_ORDERS: 'ERASE_USER_ORDERS' = 'ERASE_USER_ORDERS';

export interface ISaveAllOrdersAction {
  readonly type: 'SAVE_ALL_ORDERS';
  readonly fieldName: string;
  readonly data: IAllOrders;
}
export const saveAllOrdersActionCreater = (type: 'SAVE_ALL_ORDERS', fieldName: string, 
  data: IAllOrders): ISaveAllOrdersAction => {
  return {
    type,
    fieldName,
    data
  }
};

export interface IEraseUserOrdersAction {
  type: 'ERASE_USER_ORDERS';
}
export const eraseUserOrdersActionCreator = (): IEraseUserOrdersAction => {
  return {
    type: ERASE_USER_ORDERS,
  }
};