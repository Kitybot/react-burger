import { SAVE_USER } from '../actions/user';
import { ISaveOrEraseUserAction } from '../actions/user';

export interface IUserState {
  email: string;
  userName: string;
}

const initialState={
  email: '',
  userName: '',
}

export const userReducer = (state = initialState, action: ISaveOrEraseUserAction)
  : IUserState => {
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