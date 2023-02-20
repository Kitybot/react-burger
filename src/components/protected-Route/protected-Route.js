import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { requestWithAccessToken,
         getUser } from '../../services/actions/user';
import { getAccessTokenOutCookie } from '../../utils/utils';
import PropTypes from 'prop-types';

function ProtectedRoute({children, ...optionsRoute}) {
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
        new Promise ((resolve, reject) => {
          requestWithAccessToken( dispatch, 
                                  getUser, 
                                  accessToken, 
                                  refreshToken, 
                                  {resolve, reject})
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

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string
}

export default ProtectedRoute;