import React from "react";
import PropTypes from 'prop-types';
import styles from './typeIngredient.module.css';
import Ingredient from "../ingredient/ingredient";

export default function TypeIngredient(props) {
  return (
    <li id={props.id}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{props.children}</h2>
      <ul className={`pl-4 pr-4 pt-6 pb-10 ${styles.list}`}>
        {props.data.map((item) => {
          return item['type'] === props.type && (
            <Ingredient url={item['image']} price={item['price']} name={item['name']} 
                        key={item['_id']} id={item['_id']} order={props.order}/>
          )
        })}
      </ul>
    </li>
  )
}

TypeIngredient.propTypes = {
  children: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  })
}