import { ADD_BUN, 
    ADD_OTHER_INGREDIENT, 
    DELETE_OTHER_INGREDIENT, 
    MOVING_INGREDIENT,
    RESET_CONSTRUCTOR } from '../actions/burger-constructor';

const initialState = {
bun: '',
others: [],
}
export const burgerConstructorReducer = (state = initialState, action) => {
switch (action.type) {
case RESET_CONSTRUCTOR:
 return {
   bun: '',
   others: [],
 };
case MOVING_INGREDIENT:
 const [movedIngredient] = [...state.others.splice(action.indexOfMoved, 1)];
 state.others.splice(action.indexOfRecipient, 0, movedIngredient);
 return {
   ...state,
   others: [...state.others],
 };
case DELETE_OTHER_INGREDIENT:
 state.others.splice(action.index, 1);
 return {
   ...state,
   others: [...state.others],
 };
case ADD_OTHER_INGREDIENT:
 const ingredient = {
   id: action.id,
   uuid: action.uuid,
 };
 state.others.push(ingredient);
 return {
   ...state,
   others: [...state.others],
 }
case ADD_BUN:
 return {
   ...state,
   bun: action.id
 };
default:
 return state;
}
};