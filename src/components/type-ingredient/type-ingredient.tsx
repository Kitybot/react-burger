import React from "react";
import { useSelector } from "../../utils/hooks";
import styles from './type-ingredient.module.css';
import Ingredient from "../ingredient/ingredient";


interface ITypeIngredientProps {
  children: string;
  type: string;
  id: string;
}

const TypeIngredient = React.forwardRef( ({type, id, children}: ITypeIngredientProps, 
  ref: React.ForwardedRef<HTMLLIElement>) => {

  const ingredients = useSelector( state => state.burgerIngredients);

  return (
    <li id={id} ref={ref}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{children}</h2>
      <ul className={`pl-4 pr-4 pt-6 pb-10 ${styles.list}`}>
        {ingredients && ingredients.map((item) => {
          return item['type'] === type && (
            <Ingredient key={item.uuid} ingredient={item}/>
          )
        })}
      </ul>
    </li>
  )
});

export default TypeIngredient;