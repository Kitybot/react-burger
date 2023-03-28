import React from "react";
import { useSelector } from "../../utils/hooks";
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { TIgredient } from '../../utils/types';

function Ingredient({ingredient}: {ingredient: TIgredient}) {

  const location = useLocation();
  const ingredientsConstructor = useSelector( state => state.burgerConstructor);

  const number = ingredient._id === ingredientsConstructor.bun ? 1 : 
    ingredientsConstructor.others.reduce(
      function(previousValue, item) {
        return ingredient._id === item.id ? previousValue += 1 : previousValue;
      }, 0
    );

  const [, dragRef, dragPreviewRef] = useDrag({
    type: 'ingredient',
    item: {
      _id: ingredient._id,
      _type: ingredient.type,
    }
  }, [ingredient._id, ingredient.type]);
  
  

  return (
  <Link to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: {
                          background: location,
                          ingredient
                        }
              }}
          className={styles.link}>
      <li 
        className={styles.ingreient} 
        id={ingredient._id} 
        ref={dragRef}
      >
        <img 
          src={ingredient.image} 
          alt={`Иконка ${ingredient.name}`} 
          className={`mb-2 ${styles.image}`}
          ref={dragPreviewRef}
        />
        {number !== 0 && (<Counter count={number} size="default"/>)}
        <div className={`mb-2 ${styles.prise}`}>
          <p className={`text text_type_digits-default mr-2 ${styles.priseText}`}>
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.description}`}>
          {ingredient.name}
        </p>
        </li>
    </Link>
  )
}

export default Ingredient;