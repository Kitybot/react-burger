import React, { useRef } from "react";
import { useSelector } from "../../utils/hooks";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import TypeIngredient from '../type-ingredient/type-ingredient';


function BurgerIngredients () {

  const listsIngredients = useRef<HTMLUListElement>(null);
  const listBuns = useRef<HTMLLIElement>(null);
  const listSauces = useRef<HTMLLIElement>(null);
  const listMains = useRef<HTMLLIElement>(null);

  const ingredients = useSelector(state => state.burgerIngredients);

  const [current, setCurrent] = React.useState<string>('bun');

  const handleScroll = (): void => {
    const positionListsIngredients = listsIngredients.current && listsIngredients.current.getBoundingClientRect().top;
    const positionListSauces = listSauces.current && listSauces.current.getBoundingClientRect().top;
    const positionListMains = listMains.current && listMains.current.getBoundingClientRect().top;
    const relativeСoordinates = {
      sauces: ((positionListSauces ? positionListSauces : 0) - (positionListsIngredients ? positionListsIngredients :0)) < 70 ? true : false,
      mains: ((positionListMains ? positionListMains : 0) - (positionListsIngredients ? positionListsIngredients :0)) < 70 ? true : false,
    };
    const currentList = (): string => {
      if (!relativeСoordinates.sauces) {
        return 'bun';
      } else if (!relativeСoordinates.mains){
        return 'sauce';
      } else {
        return 'main';
      }
    }
    setCurrent(currentList);
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