import React from 'react'
import "./style.css";

export default function Modal({ handleClose, show, children }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
    <section className="modal-main text-center">
      <p> <strong> {children} </strong> </p>
      <button onClick={handleClose}>close</button>
    </section>
      
    </div>
  )
}
