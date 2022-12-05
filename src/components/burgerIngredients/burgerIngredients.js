import React from "react";
import data from '../../utils/types';
import styles from './burgerIngredients.module.css';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../typeIngredient/typeIngredient';

export default function BurgerIngredients (props) {
  const [current, setCurrent] = React.useState('bun');
  return(
    <section className={`pt-10 ${styles.ingredients}`}>
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
        <TypeIngredient data={data} type='bun' order={props.order} id='buns'>Булки</TypeIngredient>
        <TypeIngredient data={data} type='sauce' order={props.order} id='sauces'>Соусы</TypeIngredient>
        <TypeIngredient data={data} type='main' order={props.order} id='mains'>Начинки</TypeIngredient>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  })
}