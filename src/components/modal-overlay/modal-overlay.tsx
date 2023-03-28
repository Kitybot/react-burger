import React, { FC } from "react";
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  children: JSX.Element;
  closeModalClickOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalOverlay: FC<IModalOverlay> = ({children, closeModalClickOverlay}) => {
  return(
    <div className={styles.modalOverlay} id={'overlay'} onClick={closeModalClickOverlay}>
        {children}
    </div>
  )
}

export default ModalOverlay;