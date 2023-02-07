import React from "react";
import { useSelector } from "react-redux";
import styles from '../ingredient-detalis/ingredient-detalis.module.css';
import { useLocation } from 'react-router-dom';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';

function IngredientDetails({ingredient, modal}) {
  const location = useLocation();
  const ingredientInStore = useSelector( state => state.ingredientDetails);
  const {image_large, 
         name, 
         calories, 
         proteins, 
         fat, 
         carbohydrates} = ingredient ? ingredient : ingredientInStore;
         window.history.replaceState(null, null, location.pathname);

  return(
    <>
      <h2 className={`text text_type_main-large ${modal && styles.title} mt-3`}>
        Детали ингредиента
      </h2>
      <img 
        src={image_large} 
        alt={`Изображение ${name}`} 
        className={`${styles.image} mt-3`}
      />
      <p className={`text text_type_main-medium mt-4`}>{name}</p>
      <ul className={`${styles.foodValue} mt-8`}>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Калории,ккал
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {calories}
          </p>
        </li>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Белки, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {proteins}
          </p>
        </li>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Жиры, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {fat}
          </p>
        </li>
        <li className={styles.component}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Углеводы, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {carbohydrates}
          </p>
        </li>
      </ul>
    </>
  )
}
IngredientDetails.defaultProps = {ingredient: null};

IngredientDetails.propTypes = {
  ingredient: ingredientType,
  modal: PropTypes.bool
};

export default IngredientDetails;