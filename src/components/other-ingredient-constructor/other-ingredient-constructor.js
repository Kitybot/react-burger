import styles from './other-ingredient-constructor.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

const OtherIngredientConstructor = ({item, index, removeIngredient, moveIngredient}) => {

  const [, dragRef] = useDrag({
    type: 'ingredientInConstructor',
    item: {index},
  });

  const [, DropTargetRef] = useDrop({
    accept: 'ingredientInConstructor',
    drop: (item) => {
      moveIngredient(item.index, index);
    }
  })

  return (
    <li className={`pl-4 ${styles.otherIngredient}`} index={index}  ref={dragRef}>
      <div className={styles.container} ref={DropTargetRef}>
        <DragIcon type="primary" />
        <ConstructorElement text={item.name} thumbnail={item.image} 
          price={item.price} handleClose={removeIngredient}/>
      </div>
    </li>
  );
};

OtherIngredientConstructor.propTypes = {
  item: ingredientType,
  index: PropTypes.number,
  removeIngredient: PropTypes.func,
  moveIngredient: PropTypes.func,
}

export default OtherIngredientConstructor;