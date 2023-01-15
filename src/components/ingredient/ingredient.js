import React, { useContext } from "react";
import styles from '../ingredient/ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { OrderContext } from "../../services/appContext";
function Ingredient({openModal, ingredient}) {

  const [stateOrder] = useContext(OrderContext);

  const number = ingredient._id === stateOrder.bun ? 1 : stateOrder.others.reduce(
    function(previousValue, item) {
      return ingredient._id === item ? previousValue += 1 : previousValue;
    }, 0
  );

  const openModalIngredientDetails = () => {
    openModal('ingredientDetails', ingredient);
  }

  return (
    <li className={styles.ingreient} id={ingredient.id} onClick={openModalIngredientDetails}>
      <img src={ingredient.image} alt={`Иконка ${ingredient.name}`} className={`mb-2 ${styles.image}`}/>
      {number !== 0 && (<Counter count={number} size="default"/>)}
      <div className={`mb-2 ${styles.prise}`}>
        <p className={`text text_type_digits-default mr-2 ${styles.priseText}`}>{ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>{ingredient.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  openModal: PropTypes.func,
  ingreient: ingredientType
}

export default Ingredient;