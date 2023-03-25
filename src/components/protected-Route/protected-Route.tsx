import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { useLayoutEffect, useState, FC } from 'react';
import { getUser, updateTokens } from '../../services/actions/user';
import { getAccessTokenOutCookie } from '../../utils/utils';
import { IRoute } from '../../utils/types';

const ProtectedRoute:FC<IRoute> = ({children, ...optionsRoute}) =>{
  const {userName, userEmail} = useSelector(state => ({
    userName: state.user.userName, 
    userEmail: state.user.email,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isRequestUser, setIsRequestUser] = useState(false);

  useLayoutEffect(() => {
    if (userName === '' || userEmail === '') {
      setIsRequestUser(true);
      const accessToken = getAccessTokenOutCookie();
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        new Promise<void> ((resolve, reject) => {
          getUser(dispatch, accessToken)
          .then(() => resolve())
          .catch( () => {
            updateTokens(dispatch, refreshToken)
              .then((newAccessToken) => {
                if (newAccessToken) {
                  getUser(dispatch, newAccessToken);
                }
                resolve();
              }
              )
              .catch(() => reject());
          })
        })
        .catch(() => {
          history.replace({
            pathname: '/login', 
            state: {from: location.pathname}
          });
        });
      } else {
        history.replace({
          pathname: '/login', 
          state: {from: location.pathname}
        });
      }
    } else {
      setIsRequestUser(false);
    }
  }, [userName, userEmail]);

  return(
    <Route 
      {...optionsRoute}
      render={() => 
        isRequestUser ? 
        (
          <h1 className='text text_type_main-large mt-20'>
            Запрашиваем данные аккаунта...
          </h1>
        ) :
        children
      }
    />
  )
}

export default ProtectedRoute;