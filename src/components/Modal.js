import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
const dispatch = useDispatch();

  return (
    <div className="modal-container">
      <div className="modal">
        <h4>Remove all items from the container</h4>
        <div className="btn-container">
          <button className="btn confirm-btn" onClick={() => {
            dispatch(clearCart());
            dispatch(closeModal())
          }}>
            Confirm
          </button>
          <button className="btn clear-btn" onClick={() => {dispatch(closeModal())}}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
