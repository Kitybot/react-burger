import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../type-ingredient/type-ingredient';


function BurgerIngredients () {

  const listsIngredients = useRef(null);
  const listBuns = useRef(null);
  const listSauces = useRef(null);
  const listMains = useRef(null);

  const ingredients = useSelector(state => state.burgerIngredients);

  const [current, setCurrent] = React.useState('bun');

  const handleScroll = () => {
    const positionListsIngredients = listsIngredients.current.getBoundingClientRect().top;
    const positionListSauces = listSauces.current.getBoundingClientRect().top;
    const positionListMains = listMains.current.getBoundingClientRect().top;
    const relativeСoordinates = {
      sauces: (positionListSauces - positionListsIngredients) < 70 ? true : false,
      mains: (positionListMains - positionListsIngredients) < 70 ? true : false,
    };
    const currentList = () => {
      if (!relativeСoordinates.sauces) {
        return 'bun';
      } else if (!relativeСoordinates.mains){
        return 'sauce';
      } else {
        return 'main';
      }
    }
    if (current !== currentList) {
      setCurrent(currentList);
    }
  };
  
  return(
    <section className={`pt-10 ${styles.ingredients}`}>
      {ingredients ? 
        (<>
          <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>
            Соберите бургер
          </h1>
          <nav className={`mb-10 ${styles.tabs}`}>
            <a href="#buns" className={styles.links}>
              <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
              </Tab>
            </a>
            <a href="#sauces" className={styles.links}>
              <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
              </Tab>
            </a>
            <a href="#mains" className={styles.links}>
              <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
              </Tab>
            </a>
          </nav>
          <ul className={styles.listsIngredients} id='liste' onScroll={handleScroll} 
            ref={listsIngredients}>
            <TypeIngredient type='bun' id='buns' ref={listBuns}>
              Булки
            </TypeIngredient>
            <TypeIngredient type='sauce' id='sauces' ref={listSauces}>
              Соусы
            </TypeIngredient>
            <TypeIngredient type='main' id='mains' ref={listMains}>
              Начинки
            </TypeIngredient>
          </ul>
        </>) :
        (<h1 className={`text text_type_main-large mb-5 ${styles.title}`}>
           Загружаем ингредиенты...
        </h1>)
      }
    </section>
  )
}

export default BurgerIngredients;