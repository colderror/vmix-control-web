import React from 'react';
import './Modal.scss';

const Modal = ({ showModal, closeModal, children }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
