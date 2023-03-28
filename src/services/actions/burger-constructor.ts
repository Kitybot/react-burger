import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_OTHER_INGREDIENT: 'ADD_OTHER_INGREDIENT' = 'ADD_OTHER_INGREDIENT';
export const DELETE_OTHER_INGREDIENT: 'DELETE_OTHER_INGREDIENT' = 'DELETE_OTHER_INGREDIENT';
export const MOVING_INGREDIENT: 'MOVING_INGREDIENT' = 'MOVING_INGREDIENT';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';

export interface IDeleteIngredientAction {
  type: 'DELETE_OTHER_INGREDIENT';
  index: number;
}
export const deleteIngredientActionCreator = (index: number): IDeleteIngredientAction => {
  return {
    type: DELETE_OTHER_INGREDIENT,
    index,
  }
};

export interface IMovingIngredientAction {
  readonly type: 'MOVING_INGREDIENT';
  readonly indexOfMoved: number;
  readonly indexOfRecipient: number;
}
export const movingIngredientActionCreator = 
  (indexOfMoved: number, indexOfRecipient: number): IMovingIngredientAction => {
  return {
    type: MOVING_INGREDIENT,
    indexOfMoved,
    indexOfRecipient,
  }
};

export interface IResetConstructorAction {
  readonly type: 'RESET_CONSTRUCTOR';
}
export const resetConstructorActionCreator = (): IResetConstructorAction => {
  return {
    type: RESET_CONSTRUCTOR,
  }
};

export interface IAddBunAction {
  readonly type: 'ADD_BUN';
  readonly id: string;
}
export interface IAddOtherIngredientAction {
  readonly type: 'ADD_OTHER_INGREDIENT';
  readonly id: string;
  readonly uuid: string;
}
interface IItem {
  _id: string;
  _type: string;
}
export const addIngredientActionCreator = (item: IItem): 
  IAddBunAction | IAddOtherIngredientAction => {
  if (item._type === 'bun') {
    return {
      type: ADD_BUN,
      id: item._id,
    }
  }
  return {
    type: ADD_OTHER_INGREDIENT,
    id: item._id,
    uuid: uuidv4(),
  }
};