import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-detalis/ingredient-detalis';
import ErrorMessage from '../error-massege/error-massege';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { closeModal } from '../../services/actions/app';


const App = () => {
  
  const dispatch = useDispatch();

  const { ingredients, isModalActive, message } = useSelector( state => ({
    ingredients: state.burgerIngredients,
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));
  useEffect( () => {
    
  dispatch(getIngredients())
  } , [dispatch]);

  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  return (
    <div className={styles.app}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
        <BurgerIngredients/>
        {ingredients && (<BurgerConstructor/>)}
        </main>
        </DndProvider>
      {isModalActive !== '' && (
        <Modal closeModalWithDispatch={closeModalWithDispatch} activeModal={isModalActive}>
          {isModalActive === 'orderDetails' && ( <OrderDetails/> )}
          {isModalActive === 'ingredientDetails' && (<IngredientDetails/>)}
          {isModalActive === 'error' && (<ErrorMessage message={message}/>)}
        </Modal>
      )}
    </div>
  );
}

export default App;