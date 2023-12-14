import React from "react";
import cn from "classnames";


const Modal = ({ children, open }) => {
  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": open,
  });
  return (
    <div className={modalClass}>
      <div className="modal-box">{children}</div>
    </div>
  );
};

export default Modal;