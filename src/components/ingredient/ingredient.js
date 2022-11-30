import React from "react";
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function Ingredient(props) {

  const number = props.id === props.order.bun ? 1 : props.order.others.reduce(
    function(previousValue, item) {
      return props.id === item ? previousValue += 1 : previousValue;
    }, 0
  )

  return (
    <li className={styles.ingreient} id={props.id}>
      <img src={props.url} alt={`Иконка ${props.name}`} className={`mb-2 ${styles.image}`}/>
      {number !== 0 && (<Counter count={number} size="default"/>)}
      <div className={`mb-2 ${styles.prise}`}>
        <p className={`text text_type_digits-default mr-2 ${styles.priseText}`}>{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>{props.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  url: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  })
}