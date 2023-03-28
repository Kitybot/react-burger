import styles from './other-ingredient-constructor.module.css';
import { DragIcon, ConstructorElement } from 
  '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { TOtherIgredient } from '../../utils/types';
import { FC } from 'react';

interface IOtherIngredientConstructor {
  item: TOtherIgredient;
  index: number;
  removeIngredient: (e?: React.MouseEvent<SVGAElement>) => void;
  moveIngredient: (indexOfMoved: number, indexOfRecipient: number) => void;
};

const OtherIngredientConstructor: FC<IOtherIngredientConstructor> = (
    {item, index, removeIngredient, moveIngredient}
  ) => {

  const [, dragRef] = useDrag({
    type: 'ingredientInConstructor',
    item: {index},
  });

  const [, DropTargetRef] = useDrop({
    accept: 'ingredientInConstructor',
    drop: (item: {index: number}) => {
      moveIngredient(item.index, index);
    }
  });

  const {name, image, price} = item;

  return (
    <li className={`pl-4 ${styles.otherIngredient}`} id={String(index)}  ref={dragRef}>
      <div className={styles.container} ref={DropTargetRef}>
        <DragIcon type="primary" />
        {name && image && price && (<ConstructorElement text={name} thumbnail={image} 
          price={price} handleClose={removeIngredient}/>)}
      </div>
    </li>
  );
};

export default OtherIngredientConstructor;