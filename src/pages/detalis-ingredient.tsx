import { useEffect } from 'react';
import { useSelector, useDispatch } from '../utils/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-detalis/ingredient-detalis';
import { getIngredients } from '../services/actions/burger-ingredient';
import styles from './detalis-ingredient.module.css';

function DetailsIngredient() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.burgerIngredients);

  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }
  }, []);


  const {_id} = useParams<{_id: string}>();
  let ingredient;
  if (ingredients) {
    ingredient = ingredients.find(item => {
      return _id === item._id
    });
  }

  return (
    <main className={`${styles.page} pt-30`}>
      {
        ingredient ? 
        (<IngredientDetails ingredient={ingredient}/>) :
        (<img src={""} alt='Загружаем...'/>)
      }
    </main>
  )
}

export default DetailsIngredient;