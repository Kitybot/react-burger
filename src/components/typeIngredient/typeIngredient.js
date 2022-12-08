import React from "react";
import PropTypes from 'prop-types';
import styles from './typeIngredient.module.css';
import Ingredient from "../ingredient/ingredient";
import {ingredientType} from '../../utils/types';

function TypeIngredient({data, type, order, id, openModal, children}) {
  return (
    <li id={id}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{children}</h2>
      <ul className={`pl-4 pr-4 pt-6 pb-10 ${styles.list}`}>
        {data.map((item) => {
          return item['type'] === type && (
            <Ingredient key={item._id} order={order} openModal={openModal} ingredient={item}/>
          )
        })}
      </ul>
    </li>
  )
}

TypeIngredient.propTypes = {
  children: PropTypes.string,
  data: PropTypes.arrayOf(ingredientType),
  type: PropTypes.string,
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  }),
  openModal: PropTypes.func,
  id: PropTypes.string
}

export default TypeIngredient;