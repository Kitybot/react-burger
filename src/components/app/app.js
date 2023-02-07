import React from 'react';
import styles from './app.module.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Constructor from '../../pages/constructor';
import NotFound404 from '../../pages/notFound404';
import Registration from '../../pages/registration';
import Authorization from '../../pages/authorization';
import Recovery from '../../pages/recovery';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import RouteNotAuthorized from '../routeNotAuthorized/routeNotAuthorized';
import DetailsIngredient from '../../pages/detailsIngredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-detalis/ingredient-detalis';


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const ingredient = location.state && location.state.ingredient;

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
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {background && (<Route path='/ingredients/:_id'>
                          <Modal>
                            <IngredientDetails 
                              ingredient={ingredient}
                              modal={true}/>
                          </Modal>
                        </Route>)}
    </div>
  );
}

export default App;