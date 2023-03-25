import { UPDATE_INGREDIENTS } from '../actions/burger-ingredient';
import { TIgredient } from '../../utils/types';
import { TAllActions } from '../actions/unionIfActions';

export type TBurgerIngredientsState = null | Array<TIgredient>;

export const burgerIngredientsReducer = (state: TBurgerIngredientsState = null, 
  action: TAllActions): TBurgerIngredientsState => {
  switch (action.type) {
    case UPDATE_INGREDIENTS: 
      return action.ingredients;
    default:
      return state;
  }
};