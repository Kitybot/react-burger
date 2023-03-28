import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { useLayoutEffect, useState, FC } from 'react';
import { getAccessTokenOutCookie } from '../../utils/utils';
import { getUser, updateTokens } from '../../services/actions/user';
import { IRoute } from '../../utils/types';

const RouteNotAuthorized: FC<IRoute> = ({children, ...optionsRoute}) =>{
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

export default RouteNotAuthorized;