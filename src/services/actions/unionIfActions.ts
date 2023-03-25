import { IChangeActivePageAction, IOpenModalAction, ICloseModalAction } from './app';
import {  IResetConstructorAction,
          IAddBunAction,
          IAddOtherIngredientAction,
          IMovingIngredientAction,
          IDeleteIngredientAction } from './burger-constructor';
import { IUpdateIngredientsAction } from './burger-ingredient';
import { IDeleteIngrdientDetailsAction } from './ingredient-detalis';
import {  ISaveOrderDataAction,
          ICountPriceBurgerAction } from './order-detalis';
import {  ISocketStartFeedAndHistoryActions,
          IBreakWsConnectionAction, 
          ICloseWsConnectionAction,
          IOpenWsConnectionAction, 
          IErrorWsConnectionAction } from './socket-Middleware';
import { ISaveOrEraseUserAction } from './user';
import { ISaveAllOrdersAction, IEraseUserOrdersAction } from './orders';

export type TAllActions = 
  | IChangeActivePageAction
  | IOpenModalAction
  | ICloseModalAction
  | IResetConstructorAction
  | IAddBunAction
  | IAddOtherIngredientAction
  | IMovingIngredientAction
  | IDeleteIngredientAction
  | IUpdateIngredientsAction
  | IDeleteIngrdientDetailsAction
  | ISaveOrderDataAction
  | ICountPriceBurgerAction
  | ISocketStartFeedAndHistoryActions
  | IBreakWsConnectionAction
  | ICloseWsConnectionAction
  | IOpenWsConnectionAction
  | IErrorWsConnectionAction
  | ISaveOrEraseUserAction
  | ISaveAllOrdersAction
  | IEraseUserOrdersAction