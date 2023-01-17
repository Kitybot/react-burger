import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay({children, closeModalClickOverlay}) {
  return(
    <div className={styles.modalOverlay} id={'overlay'} onClick={closeModalClickOverlay}>
        {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModalClickOverlay: PropTypes.func.isRequired
}

export default ModalOverlay;