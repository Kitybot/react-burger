import React from "react";
import styles from './burgerIngredients.module.css';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../typeIngredient/typeIngredient';
import {ingredientType} from '../../utils/types';

function BurgerIngredients ({order, ingredients, openModal}) {

  const {number, execution, ...orderIngredients} = order;

  const [current, setCurrent] = React.useState('bun');
  
  return(
    <section className={`pt-10 ${styles.ingredients}`}>
      {ingredients ? 
        (<>
          <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Соберите бургер</h1>
          <nav className={`mb-10 ${styles.tabs}`}>
            <a href="#buns" className={styles.links}>
              <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
            </a>
            <a href="#sauces" className={styles.links}>
              <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
            </a>
            <a href="#mains" className={styles.links}>
              <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </a>
          </nav>
          <ul className={styles.listsIngredients}>
            <TypeIngredient data={ingredients} type='bun' order={orderIngredients} id='buns' openModal={openModal}>Булки</TypeIngredient>
            <TypeIngredient data={ingredients} type='sauce' order={orderIngredients} id='sauces' openModal={openModal}>Соусы</TypeIngredient>
            <TypeIngredient data={ingredients} type='main' order={orderIngredients} id='mains' openModal={openModal}>Начинки</TypeIngredient>
          </ul>
        </>) :
        (<h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Загружаем ингредиенты...</h1>)
      }
    </section>
  )
}

BurgerIngredients.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.string,
    execution: PropTypes.string,
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  ingredients: PropTypes.arrayOf(ingredientType),
  openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;