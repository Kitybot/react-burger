import React, { FC }from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
import { TAllActions } from '../../services/actions/unionIfActions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { TRootState } from '../../utils/types';

interface IModal {
  children?: JSX.Element | boolean;
  activeModal: string;
  closeModalWithDispatch?: (saveBurger?: boolean) => 
    TAllActions | ThunkAction<void, Action<any>, TRootState, TAllActions>;
}

const Modal: FC<IModal> = ({children, activeModal, closeModalWithDispatch}) => {
  const history = useHistory();

  function closeModal() {
    closeModalWithDispatch ? closeModalWithDispatch() : history.goBack();
  } 

  const closeModalClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'overlay' && e.currentTarget === e.target) {
      closeModal();
    };
  }

  const closeModalEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    };
  }

  React.useEffect(
    () => {
      document.addEventListener('keydown', closeModalEsc);
      return () => {
        document.removeEventListener('keydown', closeModalEsc);
      };
    },[]);

    const element = document.getElementById('react-modals');

    return element && ReactDOM.createPortal(
    ( <ModalOverlay closeModalClickOverlay={closeModalClickOverlay}>
        <div className={` pl-10 pr-10 ${activeModal === 'orders' ? 'pt-15 pb-10' :'pt-10 pb-15'} 
                          ${styles.modal} 
                          ${activeModal && styles[activeModal]}
                        `}>
          <div className={styles.closeIcon}>
            <CloseIcon 
              type="primary" 
              onClick={() =>  closeModal()}
            />
          </div>
          {children}
        </div>
      </ModalOverlay>),
    element
  );
}
export default Modal;
