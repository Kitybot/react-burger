import { baseUrl, checkResponse } from '../../utils/utils';
import { setCookie } from '../../utils/utils';

export const SAVE_USER = 'SAVE_USER';

export const eraseUserActionCreator = () => ({
  type: SAVE_USER,
  email: '',
  name: '',
});

const saveUserActionCreator = (data) => ({
  type: SAVE_USER,
  email: data.user.email,
  name: data.user.name,
});

export const requestAboutUser = ({requestOptions = {},
                                  endpointUrl = '', 
                                  options = {},
                                  setIsRequestSuccessful = '',
                                  }) => {
  return function(dispatch) {
    fetch(`${baseUrl}${endpointUrl}`, requestOptions)
    .then(checkResponse)
    .then(data => {
      if (data.user) {
        dispatch(saveUserActionCreator(data));
      }
      if (data.accessToken && data.refreshToken) {
        const accessTokenWithoutText = data.accessToken.split('Bearer ')[1];
        setCookie('accessToken', accessTokenWithoutText);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (setIsRequestSuccessful) {
        setIsRequestSuccessful({value: true, message: ''});
      } 
      if (options.resolve) {
        options.resolve(data.accessToken ? data.accessToken : null);
      }
    })
    .catch((err) => {
      if (setIsRequestSuccessful) {
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

export const updateTokens = (dispatch, refreshToken) => {
  const request = new Promise((resolve, reject) => {
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

export const getUser = (dispatch, token) => {
  const request = new Promise ((resolve, reject) => {
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

export const requestWithAccessToken = ( dispatch, 
                                        request, 
                                        accessToken, 
                                        refreshToken, 
                                        options) => {
  request(dispatch, accessToken)
    .then(() => options.resolve())
    .catch( () => {
      updateTokens(dispatch, refreshToken)
        .then((newAccessToken) => {
          request(dispatch, newAccessToken);
          options.resolve();
        }
        )
        .catch(() => options.reject());
    })
};