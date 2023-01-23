import { ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS} from '../actions/ingredient-detalis';

export const ingredientDetailsReducer = (state = null, action) => {
    switch (action.type) {
        case DELETE_INGREDIENT_DETAILS:
        return null;
        case ADD_INGREDIENT_DETAILS:
        return action.ingredient;
        default:
        return state;
    }
};