import React from "react";
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Ingredient({order, openModal, ingredient}) {

  const number = ingredient.id === order.bun ? 1 : order.others.reduce(
    function(previousValue, item) {
      return ingredient.id === item ? previousValue += 1 : previousValue;
    }, 0
  )
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
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  }),
  openModal: PropTypes.func,
  ingreient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })
  
}

export default Ingredient;