import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Constructor from '../../pages/constructor';
import NotFound404 from '../../pages/not-Found404';
import Registration from '../../pages/registration';
import Authorization from '../../pages/authorization';
import Recovery from '../../pages/recovery';
import ResetPassword from '../../pages/reset-Password';
import Profile from '../../pages/profile';
import ProtectedRoute from '../protected-Route/protected-Route';
import RouteNotAuthorized from '../route-Not-Authorized/route-Not-Authorized';
import DetailsIngredient from '../../pages/detalis-ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-detalis/ingredient-detalis';
import OrderFeed from '../../pages/order-Feed';
import FeedOrderInfo from '../../pages/feed-Order-Info';
import OwnOrderInfo from '../../pages/own-OrderInfo';
import OrderInfo from '../order-Info/order-Info';
import { getIngredients } from '../../services/actions/burger-ingredient';

const App = () => {
  const burgerIngredients = useSelector(state => state.burgerIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!burgerIngredients) {
      dispatch(getIngredients());
    }
  }, []);

  const location = useLocation();
  const background = location.state && location.state.background;
  const ingredient = location.state && location.state.ingredient;
  const orders = location.state && location.state.orders;

  return (
    <div className={`${styles.app} ${styles.variables}`}>
        <AppHeader/>
        <Switch location={ background || location }>
          <Route path='/' exact={true}>
            <Constructor/>
          </Route>
          <Route path='/ingredients/:_id'>
            <DetailsIngredient />
          </Route>
          <Route path='/feed' exact={true}>
            <OrderFeed />
          </Route>
          <Route path='/feed/:id'>
            <FeedOrderInfo />
          </Route>
          <RouteNotAuthorized path='/login' exact={true}>
            <Authorization/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/register' exact={true}>
            <Registration/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/forgot-password' exact={true}>
            <Recovery/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/reset-password' exact={true}>
            <ResetPassword />
          </RouteNotAuthorized>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <OwnOrderInfo />
          </ProtectedRoute>
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {background && (
                          <Switch>
                            <Route path='/ingredients/:id'>
                              <Modal activeModal='ingredientDetails'>
                                <IngredientDetails 
                                  ingredient={ingredient}
                                  modal={true}/>
                              </Modal>
                            </Route>
                            <Route  path='/feed/:id'
                                    render={ () => (<Modal activeModal='orders'>
                                                      <OrderInfo
                                                        orders={orders}
                                                        modal={true}/>
                                                    </Modal>)} />
                            <Route  path='/profile/orders/:id'
                                    render={ () => (<Modal activeModal='orders'>
                                                      <OrderInfo
                                                        orders={orders}
                                                        modal={true}/>
                                                    </Modal>)} />
                          </Switch>
                        )
        }
    </div>
  );
}
export default App;