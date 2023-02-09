import { Route, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { getAccessTokenOutCookie } from '../../utils/utils';
import { requestWithAccessToken, getUser } from '../../services/actions/user';

function RouteNotAuthorized({children, ...optionsRoute}) {
  const {userName, userEmail} = useSelector(state => ({
    userName: state.user.userName, 
    userEmail: state.user.email,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [isRequest, setIsRequest] = useState(false);

  useLayoutEffect(() => {
    if (!location.state) {
      if (userName === '' || userEmail === '') {
        setIsRequest(true);
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
          .then(() => {
            setIsRequest(false)
            history.replace({pathname: '/'});
          })
          .catch(() => {
            setIsRequest(false);
          })
        } else {
          setIsRequest(false);
        }
      } else {
        setTimeout(() => {
          history.replace({pathname: '/'});
        }, 100)
      }
    }
  }, [userName, userEmail]);

  return (
    <Route
      {...optionsRoute}
      render={() => isRequest ? 
                    (<img src={""} alt='Работаем...' className='mt-20'/>) : 
                    children}
    />
  )
}

RouteNotAuthorized.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string
}

export default RouteNotAuthorized;