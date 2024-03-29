import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredient';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-detalis';
import { orderDetailsReducer } from './order-detalis';
import { appReducer } from './app';
import { userReducer } from './user';
import { ordersReducer } from './orders';
import { socketMiddlewareReducer } from './socket-Middleware';

export const rootReducer = combineReducers({
    app: appReducer,
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    user: userReducer,
    orders: ordersReducer,
    wsConnect: socketMiddlewareReducer,
});
export type TRootState = ReturnType<typeof rootReducer>;