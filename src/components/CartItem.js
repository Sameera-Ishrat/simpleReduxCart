import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import { removeItem, increase, decrease } from "../features/cart/cartSlice";

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={img} alt={title} />
      <div className="cart-title">
        <h3>{title}</h3>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove item
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase({ id }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if(amount === 1) {
              dispatch(removeItem(id))
            }
            dispatch(decrease({ id }))}
          }
          
           
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
