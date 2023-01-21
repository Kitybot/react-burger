import { OPEN_MODAL, CLOSE_MODAL } from '../actions/app';

const initialState = {
  activePage: 'constructor',
  isModalActive: {
    isModalActive: '',
    message: ''
  }
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        isModalActive: {
          isModalActive: '',
          message: ''
        }
      };
    case OPEN_MODAL:
      return {
        ...state,
        isModalActive: {
          isModalActive: action.isModalActive,
          message: action.message ? action.message : '',
        }
      };
    default:
      return state;
  }
};
