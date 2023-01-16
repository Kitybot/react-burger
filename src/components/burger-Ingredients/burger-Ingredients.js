import React, { useContext } from "react";
import styles from './burger-Ingredients.module.css';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../type-Ingredient/type-Ingredient';
import { IngredientsContext } from "../../services/appContext";

function BurgerIngredients ({openModal}) {

  const ingredients = useContext(IngredientsContext);

  const [current, setCurrent] = React.useState('bun');

  return(
    <section className={`pt-10 ${styles.ingredients}`}>
      {ingredients ? 
        (<>
          <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>
            Соберите бургер
          </h1>
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
            <TypeIngredient type='bun' id='buns' openModal={openModal}>
              Булки
            </TypeIngredient>
            <TypeIngredient type='sauce' id='sauces' openModal={openModal}>
              Соусы
            </TypeIngredient>
            <TypeIngredient type='main' id='mains' openModal={openModal}>
              Начинки
            </TypeIngredient>
          </ul>
        </>) :
        (<h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Загружаем ингредиенты...</h1>)
      }
    </section>
  )
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
}

export default BurgerIngredients;