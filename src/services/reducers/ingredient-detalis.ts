import { DELETE_INGREDIENT_DETAILS} from '../actions/ingredient-detalis';
import { TIgredient } from '../../utils/types';
import { TAllActions } from '../actions/unionIfActions';

type TIngredientDetailsState = null | TIgredient;
export const ingredientDetailsReducer = (state: TIngredientDetailsState = null, 
  action: TAllActions): TIngredientDetailsState => {
  switch (action.type) {
    case DELETE_INGREDIENT_DETAILS:
      return null;
    default:
      return state;
  }
};