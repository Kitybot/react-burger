import { ThunkAction } from 'redux-thunk';
import { TAllActions } from '../services/actions/unionIfActions';
import { Action, ActionCreator } from 'redux';
import { store } from '../index';

export type TRootState = ReturnType<typeof store.getState>;
export type TAppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, TRootState, TAllActions>
  >;
export type TAppDispatch = typeof store.dispatch;

export type TIgredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly uuid: string;
};

export interface IRoute {
  children: JSX.Element;
  path: string;
  exact?: boolean;
}

export type TOtherIgredient = {
  _id?: string;
  name?: string;
  type?: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price?: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  uuid?: string;
};

export type TLocation = {
  hash: string;
  pathname: string;
  search: string;
  state: undefined | null;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TLocationWithState = Omit<TLocation, 'state'> & {
  state: {
    background: TLocation;
    ingredient?: TIgredient;
    orders?: Array<TOrder>;
  };
};

export type TIsRequestSuccessful = {
  value: undefined | boolean;
  message: string;
};