export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 
  'DELETE_INGREDIENT_DETAILS';

export interface IDeleteIngrdientDetailsAction {
  readonly type: 'DELETE_INGREDIENT_DETAILS';
} 
export function deleteIngrdientDetails(): IDeleteIngrdientDetailsAction {
  return {
    type: DELETE_INGREDIENT_DETAILS
  }
}