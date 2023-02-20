import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';

function Modal({children, activeModal, closeModalWithDispatch}) {
  const history = useHistory();

  function closeModal() {
    closeModalWithDispatch ? closeModalWithDispatch() : history.goBack();
  } 

  const closeModalClickOverlay = (e) => {
    if (e.target.id === 'overlay') {
      closeModal();
    };
  }

  const closeModalEsc = (e) => {
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

  return ReactDOM.createPortal(
    ( <ModalOverlay closeModalClickOverlay={closeModalClickOverlay}>
       <div className={` pl-10 pt-10 pr-10 pb-15 
                          ${styles.modal} 
                          ${activeModal ? styles[activeModal] : styles.ingredientDetails}
                        `}>
          <div className={styles.closeIcon}>
            <CloseIcon 
              type="primary" 
              onClick={() => closeModal()}
            />
          </div>
          {children}
        </div>
      </ModalOverlay>),
    document.getElementById('react-modals')
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  activeModal: PropTypes.string,
  closeModalWithDispatch: PropTypes.func,
}

export default Modal;