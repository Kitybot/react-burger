import { OPEN_MODAL, CLOSE_MODAL, CHANGE_ACTIVE_PAGE } from '../actions/app';
import { TAllActions } from '../actions/unionIfActions';

interface IAppState {
  activePage: string;
  isModalActive: {
    isModalActive: string;
    message: string;
  };
}
const initialState: IAppState = {
  activePage: 'constructor',
  isModalActive: {
    isModalActive: '',
    message: ''
  }
};

export const appReducer = (state = initialState, action: TAllActions): IAppState => {
  switch (action.type) {
    case CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.activePage,
      };
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
