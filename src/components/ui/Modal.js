import React from 'react';

import classes from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Modal = (props) => {
  const closeModal = () => {
    props.onCloseModal();
  };

  const closeIcon = (
    <FontAwesomeIcon
      className={classes.close}
      icon={faX}
      onClick={closeModal}
    />
  );

  if (props.showModal) {
    return (
      <div className={classes.backdrop}>
        <div className={classes.modal}>
          {props.children}
          {closeIcon}
        </div>
      </div>
    );
  }
};

export default Modal;
