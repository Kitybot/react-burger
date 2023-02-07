import { SAVE_USER } from '../actions/user';

const initialState={
  email: '',
  userName: '',
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        email: action.email,
        userName: action.name,
      };
    default:
      return state;
  }
};