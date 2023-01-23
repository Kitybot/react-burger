export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';
export const GET_INGREDIENT__REQUEST = 'GET_INGREDIENT__REQUEST';
export const GET_INGREDIENT__SUCCESS = 'GET_INGREDIENT__SUCCESS';
export const GET_INGREDIENT__EROOR = 'GET_INGREDIENT__EROOR';

export function deleteIngrdientDetails() {
  return {
    type: DELETE_INGREDIENT_DETAILS
  }
}

export const fetchStarted = () => {
  return {
      type: GET_INGREDIENT__REQUEST,
  };
};

export const fetchSuccess = users => {
  return {
      type: GET_INGREDIENT__SUCCESS,
      payload: users,
  };
};

export const fetchFailure = error => {
  return {
      type: GET_INGREDIENT__EROOR,
      payload: error,
  };
};