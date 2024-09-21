

import React, { useReducer } from "react";

import CartContext from "./cartContext";

const defaultCartState = {
  items: [],
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // concat makes a new immutable array which we actually
    // need in case of REACT state management

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartItemsHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCartItems: clearCartItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider