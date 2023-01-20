import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredient';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderDetailsReducer } from './orderDetails';
import { appReducer } from './app';

export const rootReducer = combineReducers({
    app: appReducer,
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
});