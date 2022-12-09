import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import ModalOverlay from '../modal-Overlay/modal-Overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

function Modal({closeModal, children, activeModal}) {
  
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
        <div className={`pl-10 pt-10 pr-10 pb-15 ${styles.modal} ${styles[activeModal]}`}>
          <div className={styles.closeIcon}><CloseIcon type="primary" onClick={closeModal}/></div>
          {children}
        </div>
      </ModalOverlay>),
    document.getElementById('react-modals')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
  activeModal: PropTypes.string.isRequired
}

export default Modal;