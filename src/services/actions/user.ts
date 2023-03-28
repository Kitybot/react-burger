import { baseUrl, checkResponse, setCookie } from '../../utils/utils';
import { TAppThunk, TAppDispatch } from '../../utils/types';  
import { Dispatch } from 'redux';
import { TAllActions } from './unionIfActions';

export const SAVE_USER: 'SAVE_USER' = 'SAVE_USER';

export interface ISaveOrEraseUserAction {
  readonly type: 'SAVE_USER';
  readonly email: string;
  readonly name: string;
}
export const eraseUserActionCreator = (): ISaveOrEraseUserAction => ({
  type: SAVE_USER,
  email: '',
  name: '',
});

const saveUserActionCreator = (data: {[name: string]: string}): ISaveOrEraseUserAction => ({
  type: SAVE_USER,
  email: data.email,
  name: data.name,
});

type TDataInResolveAboutUser = {
  success: boolean;
  user?: {[name: string]: string};
  accessToken?: string;
  refreshToken?: string;
};
interface IRequestAboutUserProps {
  requestOptions: {};
  endpointUrl: string;
  options?: {resolve?: (value: string | null) => void, reject?: () => void};
  setIsRequestSuccessful?: string | React.Dispatch<React.SetStateAction<{
    value: undefined | boolean;
    message: string;
  }>>;
}
export const requestAboutUser: TAppThunk = ({requestOptions = {},
                                  endpointUrl = '', 
                                  options = {},
                                  setIsRequestSuccessful = '',
                                  }: IRequestAboutUserProps) => {
  return function(dispatch: TAppDispatch) {
    fetch(`${baseUrl}${endpointUrl}`, requestOptions)
    .then(checkResponse)
    .then((data: TDataInResolveAboutUser) => {
      if (data.user) {
        dispatch(saveUserActionCreator(data.user));
      }
      if (data.accessToken && data.refreshToken) {
        const accessTokenWithoutText = data.accessToken.split('Bearer ')[1];
        setCookie('accessToken', accessTokenWithoutText, {path: '/'});
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (setIsRequestSuccessful && typeof setIsRequestSuccessful !== 'string') {
        setIsRequestSuccessful({value: true, message: ''});
      } 
      if (options.resolve) {
        options.resolve(data.accessToken ? data.accessToken : null);
      }
    })
    .catch((err) => {
      if (setIsRequestSuccessful && typeof setIsRequestSuccessful !== 'string') {
        setIsRequestSuccessful({
          value: false, 
          message: `${err}. Закоройте настоящее окно и попробуйте снова.`
        });
      } 
      if (options.reject) {
        options.reject();
      }
    })
  }
};

export const updateTokens = ( dispatch: TAppThunk<void> | Dispatch<TAllActions>, 
                              refreshToken: string | null) => {
  const request = new Promise<string | null>((resolve, reject) => {
    dispatch(requestAboutUser({
      requestOptions: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            'token': refreshToken
          }
        ),
      },
      endpointUrl: 'auth/token',
      options: {resolve, reject},
    }));
  });
  return request;
};

export const getUser = (dispatch: Dispatch<TAllActions> | TAppThunk<void>, token: string) => {
  const request = new Promise<string | null> ((resolve, reject) => {
    dispatch(requestAboutUser({
      requestOptions: {
        headers: {
          "authorization": token
        }
      },
      endpointUrl: 'auth/user',
      options: {resolve, reject},
      }))
  });
  return request;
};